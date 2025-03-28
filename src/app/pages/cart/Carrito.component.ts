import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule } from '@angular/forms';
import { Carrito } from '../../models/carrito.model';
import { CarritoService } from '../../services/carrito.service';
import { Rol } from '../../models/usuario.model';

@Component({
  selector: 'app-carrito',
  templateUrl:  './carrito.component.html',
  standalone: true,
  imports: [CommonModule, FormsModule],
})
export class CarritoComponent implements OnInit {
  carrito: Carrito | null = null;  // Inicia como null para evitar errores de acceso a "items"
  constructor(private carritoService: CarritoService) {}

  ngOnInit(): void {
    this.cargarCarrito();
  }

  cargarCarrito(): void {
    this.carritoService.obtenerCarrito().subscribe({
      next: (data) => {
        this.carrito = { id: 0, usuario: {
          id: 0, email: '',
          password: '',
          rol: Rol.ADMIN
        }, items: [], total: 0 };
      },
      error: (err) => {
        console.error('Error al obtener el carrito:', err);
        this.carrito = { id: 0, usuario: {
          id: 0, email: '',
          password: '',
          rol: Rol.ADMIN
        }, items: [], total: 0 };
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
      if (this.carrito) {
        this.carrito.items = [];
      }
    });
  }
}
