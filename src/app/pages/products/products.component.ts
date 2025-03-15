import { Component, OnInit } from '@angular/core';
import { CartService } from '../../services/cart.service'; // Ajusta la ruta si es necesario
import { ProductListComponent } from '../../components/product-list/product-list.component';
import { Product } from '../../models/product.model';





@Component({
  selector: 'app-products',
  standalone: true,
  imports: [ProductListComponent],
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  products: Product[] = [
    { id: 1, name: 'Producto 1', description: 'Descripción 1', price: 100, image: 'https://via.placeholder.com/150' },
    { id: 2, name: 'Producto 2', description: 'Descripción 2', price: 200, image: 'https://via.placeholder.com/150' },
    { id: 3, name: 'Producto 3', description: 'Descripción 3', price: 300, image: 'https://via.placeholder.com/150' }
  ];

  constructor(private cartService: CartService) {}

  ngOnInit(): void {}

  addToCart(product: Product) {
    this.cartService.addToCart({ ...product, quantity: 1 });
  }
}

