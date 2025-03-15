import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartService, CartItem } from '../../services/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
  standalone: true,
  imports: [CommonModule] // Importar CommonModule
})
export class CartComponent implements OnInit {
  cartItems: CartItem[] = []; // Cambiado para almacenar datos normales

  constructor(private cartService: CartService) {}

  ngOnInit() {
    this.cartService.getCartItems().subscribe(items => {
      this.cartItems = items; // Guardamos los datos en la variable
    });
  }

  removeItem(productId: number) {
    this.cartService.removeFromCart(productId);
  }
}



