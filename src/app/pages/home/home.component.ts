import { Component, OnInit } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { Producto } from '../../models/producto.model';
import { ProductoService } from '../../services/producto.service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  standalone: true,
  imports: [CommonModule, CurrencyPipe, RouterModule],
})
export class HomeComponent implements OnInit {
  featuredProducts: Producto[] = [];

  constructor(private productoService: ProductoService) {}

  ngOnInit(): void {
    this.productoService.obtenerProductosDestacados().subscribe({
      next: (productos) => (this.featuredProducts = productos),
      error: (err) => console.error('❌ Error cargando destacados:', err),
    });
  }

  clothingProducts = [
    {
      id: 1,
      name: 'Producto 1',
      description: 'Descripción 1',
      price: 199.99,
      image: 'assets/img/product1.jpg',
    },
    {
      id: 2,
      name: 'Producto 2',
      description: 'Descripción 2',
      price: 299.99,
      image: 'assets/img/product2.jpg',
    },
    {
      id: 3,
      name: 'Producto 3',
      description: 'Descripción 3',
      price: 399.99,
      image: 'assets/img/product3.jpg',
    },
    {
      id: 4,
      name: 'Producto 4',
      description: 'Descripción 4',
      price: 399.99,
      image: 'assets/img/product4.jpg',
    },
    {
      id: 4,
      name: 'Producto 4',
      description: 'Descripción 5',
      price: 399.99,
      image: 'assets/img/product5.jpg',
    },
    {
      id: 4,
      name: 'Producto 4',
      description: 'Descripción 6',
      price: 399.99,
      image: 'assets/img/product6.jpg',
    },
    {
      id: 4,
      name: 'Producto 4',
      description: 'Descripción 7',
      price: 399.99,
      image: 'assets/img/product7.jpg',
    },
    {
      id: 4,
      name: 'Producto 4',
      description: 'Descripción 8',
      price: 399.99,
      image: 'assets/img/product8.jpg',
    },
    {
      id: 4,
      name: 'Producto 4',
      description: 'Descripción 9',
      price: 399.99,
      image: 'assets/img/product9.jpg',
    },
    {
      id: 4,
      name: 'Producto 4',
      description: 'Descripción 10',
      price: 399.99,
      image: 'assets/img/product10.jpg',
    }, // 🔧 corregido "imagen" a "image"
  ];
}
