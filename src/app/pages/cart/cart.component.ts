import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartService } from '../../services/cart.service';
import { Observable } from 'rxjs';
import { CartItem } from '../../models/cart-item.model';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule],
})
export class CartComponent {
  cartItems$: Observable<CartItem[]>; // Observable de los ítems del carrito

  subtotal = 0;
  taxes = 0;
  total = 0;

  constructor(private cartService: CartService) {
    this.cartItems$ = this.cartService.getCartItems(); // Asignar el observable

    // Escuchar cambios en el carrito y actualizar el resumen
    this.cartItems$.subscribe(() => this.updateSummary());
  }

  removeItem(productId: number) {
    this.cartService.removeFromCart(productId);
  }

  clearCart() {
    this.cartService.clearCart();
  }

  updateQuantity(productId: number, quantity: number) {
    if (quantity > 0) {
      this.cartService.updateQuantity(productId, quantity);
    } else {
      this.removeItem(productId); // Si la cantidad es 0, eliminar el producto
    }
  }

  // 🔹 Método para actualizar el resumen de compra
  updateSummary() {
    this.subtotal = this.cartService.getSubtotal();
    this.taxes = this.cartService.getTaxes();
    this.total = this.cartService.getTotal();
  }


  updateQuantityFromEvent(event: Event, productId: number) {
    const inputElement = event.target as HTMLInputElement;
    const quantity = Number(inputElement.value); // Convierte el valor a número
    if (!isNaN(quantity) && quantity > 0) {
      this.updateQuantity(productId, quantity);
    }
}



}
