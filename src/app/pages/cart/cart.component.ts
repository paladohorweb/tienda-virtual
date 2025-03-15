import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
  standalone: true,
  imports: [CommonModule] // Agrega CommonModule aquí
})
export class CartComponent {
  cartItems = this.cartService.getCartItems();

  constructor(private cartService: CartService) {}




  removeItem(productId: number) {
    this.cartService.removeFromCart(productId);
    this.cartItems = this.cartService.getCartItems(); // Actualizar la lista
  }
}


