import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartService } from '../../services/cart.service';

// Definir la estructura de un producto
interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  description: string;
}

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent {
  products: Product[] = [
    {
      id: 1,
      name: 'Laptop Gamer',
      price: 1500,
      image: 'assets/laptop.jpg',
      description: 'Laptop potente para gaming y trabajo.'
    },
    {
      id: 2,
      name: 'Teclado Mecánico',
      price: 80,
      image: 'assets/keyboard.jpg',
      description: 'Teclado mecánico RGB con switches azules.'
    },
    {
      id: 3,
      name: 'Mouse Inalámbrico',
      price: 50,
      image: 'assets/mouse.jpg',
      description: 'Mouse ergonómico inalámbrico con sensor óptico.'
    }
  ];

  constructor(private cartService: CartService) {}

  addToCart(product: Product) {
    this.cartService.addToCart({ ...product, quantity: 1 });
  }
}



