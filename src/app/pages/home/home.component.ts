import { Component } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { Producto } from '../../models/producto.model';
import { ProductoService } from '../../services/producto.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  standalone: true,
  imports: [CommonModule, CurrencyPipe] // 🔹 Agregado para solucionar errores
})
export class HomeComponent {
  featuredProducts: Producto[] = [];

  constructor(private productoService: ProductoService) {}

  ngOnInit(): void {
    this.productoService.obtenerProductosDestacados().subscribe({
      next: (productos) => this.featuredProducts = productos,
      error: (err) => console.error('❌ Error cargando destacados:', err)
    });
  }


clothingProducts= [
  { id: 1, name: 'Producto 1', description: 'Descripción 1', price: 199.99, image: 'assets/img/product1.jpg' },
  { id: 2, name: 'Producto 2', description: 'Descripción 2', price: 299.99, image: 'assets/img/product2.jpg' },
  { id: 3, name: 'Producto 3', description: 'Descripción 3', price: 399.99, imagen: 'assets/img/product3.jpg' }
];
}

