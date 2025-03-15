import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { CartItem } from '../models/cart-item.model';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private cartItems: CartItem[] = JSON.parse(localStorage.getItem('cart') || '[]');
  private cartSubject = new BehaviorSubject<CartItem[]>(this.cartItems);

  /** Devuelve el carrito como un Observable */
  getCartItems() {
    return this.cartSubject.asObservable();
  }

  /** Guarda el carrito en localStorage y emite cambios */
  private updateCart() {
    const newCartState = JSON.stringify(this.cartItems);
    if (localStorage.getItem('cart') !== newCartState) { // Evita escribir si no hay cambios
      localStorage.setItem('cart', newCartState);
      this.cartSubject.next([...this.cartItems]);
    }
  }

  /** Agrega un producto al carrito */
  addToCart(item: CartItem) {
    const index = this.cartItems.findIndex((p) => p.id === item.id);
    if (index !== -1) {
      this.cartItems[index].quantity += item.quantity;
    } else {
      this.cartItems.push({ ...item, quantity: Math.max(1, item.quantity) });
    }
    this.updateCart();
  }

  /** Elimina un producto del carrito */
  removeFromCart(itemId: number) {
    this.cartItems = this.cartItems.filter((item) => item.id !== itemId);
    this.updateCart();
  }

  /** Vacía el carrito */
  clearCart() {
    if (this.cartItems.length > 0) {
      this.cartItems = [];
      this.updateCart();
    }
  }

  /** Actualiza la cantidad de un producto en el carrito */
  updateQuantity(productId: number, quantity: number) {
    const index = this.cartItems.findIndex(item => item.id === productId);
    if (index !== -1 && this.cartItems[index].quantity !== quantity) { // Solo actualiza si hay un cambio
      if (quantity <= 0) {
        this.removeFromCart(productId);
      } else {
        this.cartItems[index].quantity = quantity;
      }
      this.updateCart();
    }
  }

  /** Obtiene la cantidad de un producto en el carrito */
  getQuantity(productId: number): number {
    return this.cartItems.find((p) => p.id === productId)?.quantity || 0;
  }

  /** 🔹 Calcula el subtotal */
  getSubtotal(): number {
    return this.cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  }

  /** 🔹 Calcula impuestos (19%) */
  getTaxes(): number {
    return this.getSubtotal() * 0.19;
  }

  /** 🔹 Calcula el total a pagar */
  getTotal(): number {
    return this.getSubtotal() + this.getTaxes();
  }
}





