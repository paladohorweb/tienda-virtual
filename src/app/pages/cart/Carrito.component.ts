import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule } from '@angular/forms';
import { Carrito } from '../../models/carrito.model';
import { CarritoService } from '../../services/carrito.service';

@Component({
  selector: 'app-carrito',
  templateUrl:  './carrito.component.html',
  standalone: true,
  imports: [CommonModule, FormsModule],
})
export class CarritoComponent implements OnInit {
  carrito: any = { items: [] }; // 🔹 Evitamos 'undefined'

  constructor(private carritoService: CarritoService) {}

  ngOnInit(): void {
    this.cargarCarrito();
  }

  cargarCarrito(): void {
    this.carritoService.obtenerCarrito().subscribe({
      next: (data) => {
        this.carrito = data || { items: [] };
      },
      error: (err) => {
        console.error('Error al obtener el carrito:', err);
        this.carrito = { items: [] }; // 🔹 Evita fallos en la plantilla
      }
    });
  }

  eliminarProducto(productoId: number) {
    this.carritoService.eliminarProducto(productoId).subscribe(() => {
      this.cargarCarrito();
    });
  }

  vaciarCarrito() {
    this.carritoService.vaciarCarrito().subscribe(() => {
      this.carrito.items = [];
    });
  }
}
