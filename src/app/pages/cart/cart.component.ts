import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartService } from '../../services/cart.service';
import { Observable } from 'rxjs';
import { CartItem } from '../../models/cart-item.model';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

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

  constructor(private cartService: CartService, private router: Router) {
    this.cartItems$ = this.cartService.getCartItems();

    // Escuchar cambios en el carrito y actualizar el resumen
    this.cartItems$.subscribe(() => this.updateSummary());
  }

  /** Elimina un producto del carrito */
  removeItem(productId: number) {
    this.cartService.removeFromCart(productId);
    this.updateSummary(); // Asegurar actualización de totales
  }

  /** Vacía completamente el carrito */
  clearCart() {
    this.cartService.clearCart();
    this.updateSummary(); // Actualiza totales al vaciar
  }

  /** Actualiza la cantidad de un producto en el carrito */
  updateQuantity(productId: number, quantity: number) {
    if (quantity > 0) {
      this.cartService.updateQuantity(productId, quantity);
    } else {
      this.removeItem(productId); // Si la cantidad es 0, eliminar el producto
    }
    this.updateSummary(); // Actualiza totales
  }

  /** Se encarga de actualizar el resumen de compra */
  updateSummary() {
    this.subtotal = this.cartService.getSubtotal();
    this.taxes = this.cartService.getTaxes();
    this.total = this.cartService.getTotal();
  }

  /** Maneja la actualización de cantidad desde el evento de input */
  updateQuantityFromEvent(event: Event, productId: number) {
    const inputElement = event.target as HTMLInputElement;
    const quantity = Number(inputElement.value);

    if (!isNaN(quantity) && quantity > 0) {
      this.updateQuantity(productId, quantity);
    } else {
      inputElement.value = '1'; // Evita valores negativos o vacíos
      this.updateQuantity(productId, 1);
    }
  }

  /** Redirige al usuario a la página de checkout */
  finalizarCompra() {
    this.router.navigate(['/checkout']);
  }
}

