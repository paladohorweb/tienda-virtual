import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { openDB } from 'idb';
import { CartItem } from '../models/cart-item.model';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private cartSubject = new BehaviorSubject<CartItem[]>([]);
  private dbPromise = this.initDB(); // Inicializa IndexedDB

  constructor() {
    this.loadCart(); // Carga datos al iniciar
  }

  /** 🔹 Inicializa IndexedDB */
  private async initDB() {
    return openDB('CartDB', 1, {
      upgrade(db) {
        if (!db.objectStoreNames.contains('cart')) {
          db.createObjectStore('cart', { keyPath: 'id' });
        }
      },
    });
  }

  /** 🔹 Carga el carrito desde IndexedDB */
  private async loadCart() {
    const db = await this.dbPromise;
    const items = await db.getAll('cart');
    this.cartSubject.next(items);
  }

  /** 🔹 Obtiene los ítems del carrito como Observable */
  getCartItems() {
    return this.cartSubject.asObservable();
  }

  /** 🔹 Guarda el carrito en IndexedDB */
  private async updateCart() {
    const db = await this.dbPromise;
    const tx = db.transaction('cart', 'readwrite');
    const store = tx.objectStore('cart');

    await store.clear(); // Limpia datos previos
    const items = this.cartSubject.getValue();
    for (const item of items) {
      await store.put(item);
    }

    await tx.done;
  }

  /** 🔹 Agrega un producto al carrito */
  async addToCart(item: CartItem) {
    const currentCart = this.cartSubject.getValue();
    const index = currentCart.findIndex((p) => p.id === item.id);

    if (index !== -1) {
      currentCart[index].quantity += item.quantity;
    } else {
      currentCart.push({ ...item, quantity: Math.max(1, item.quantity) });
    }

    this.cartSubject.next([...currentCart]);
    await this.updateCart();
  }

  /** 🔹 Elimina un producto del carrito */
  async removeFromCart(itemId: number) {
    const newCart = this.cartSubject.getValue().filter((item) => item.id !== itemId);
    this.cartSubject.next(newCart);
    await this.updateCart();
  }

  /** 🔹 Vacía el carrito */
  async clearCart() {
    this.cartSubject.next([]);
    await this.updateCart();
  }

  /** 🔹 Actualiza la cantidad de un producto en el carrito */
  async updateQuantity(productId: number, quantity: number) {
    const currentCart = this.cartSubject.getValue();
    const index = currentCart.findIndex((item) => item.id === productId);

    if (index !== -1 && currentCart[index].quantity !== quantity) {
      if (quantity <= 0) {
        await this.removeFromCart(productId);
      } else {
        currentCart[index].quantity = quantity;
        this.cartSubject.next([...currentCart]);
        await this.updateCart();
      }
    }
  }


    /** 🔹 Obtiene la cantidad de un producto en el carrito */
getQuantity(productId: number): number {
  const item = this.cartSubject.getValue().find((p) => p.id === productId);
  return item ? item.quantity : 0;
}

  /** 🔹 Obtiene el subtotal */
  getSubtotal(): number {
    return this.cartSubject.getValue().reduce((sum, item) => sum + item.price * item.quantity, 0);
  }

  /** 🔹 Obtiene los impuestos */
  getTaxes(): number {
    return this.getSubtotal() * 0.19;
  }

  /** 🔹 Obtiene el total */
  getTotal(): number {
    return this.getSubtotal() + this.getTaxes();
  }



}






