import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { CartItem } from '../models/cart-item.model';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private cartItems: CartItem[] = JSON.parse(localStorage.getItem('cart') || '[]');
  private cartSubject = new BehaviorSubject<CartItem[]>(this.cartItems);

  getCartItems() {
    return this.cartSubject.asObservable();
  }

  private updateCart() {
    localStorage.setItem('cart', JSON.stringify(this.cartItems));
    this.cartSubject.next([...this.cartItems]);
  }

  addToCart(item: CartItem) {
    const index = this.cartItems.findIndex((p) => p.id === item.id);
    if (index !== -1) {
      this.cartItems[index].quantity += item.quantity;
    } else {
      this.cartItems.push({ ...item, quantity: Math.max(1, item.quantity) });
    }
    this.updateCart();
  }

  removeFromCart(itemId: number) {
    this.cartItems = this.cartItems.filter((item) => item.id !== itemId);
    this.updateCart();
  }

  clearCart() {
    this.cartItems = [];
    this.updateCart();
  }

  updateQuantity(productId: number, quantity: number) {
    const index = this.cartItems.findIndex(item => item.id === productId);
    if (index !== -1) {
      if (quantity <= 0) {
        this.removeFromCart(productId); // Eliminar si la cantidad es 0 o menos
      } else {
        this.cartItems[index].quantity = quantity;
      }
      this.updateCart();
    }
  }



  getQuantity(productId: number): number {
    const item = this.cartItems.find((p) => p.id === productId);
    return item ? item.quantity : 0;
  }

  // 🔹 Calcular Subtotal
  getSubtotal(): number {
    return this.cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  }

  // 🔹 Calcular Impuestos (ejemplo: 19%)
  getTaxes(): number {
    return this.getSubtotal() * 0.19;
  }

  // 🔹 Calcular Total
  getTotal(): number {
    return this.getSubtotal() + this.getTaxes();
  }
}




