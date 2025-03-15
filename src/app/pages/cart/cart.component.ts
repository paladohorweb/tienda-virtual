import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartService } from '../../services/cart.service';
import { Observable } from 'rxjs';
import { CartItem } from '../../models/cart-item.model';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
  standalone: true,
  imports: [CommonModule]
})
export class CartComponent {
  cartItems$: Observable<CartItem[]>; // Observable de los ítems del carrito

  constructor(private cartService: CartService) {
    this.cartItems$ = this.cartService.getCartItems(); // Asignar el observable
  }

  removeItem(productId: number) {
    this.cartService.removeFromCart(productId);
  }
}



