import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CarritoService } from '../../services/carrito.service';

@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.component.html',
  standalone: true,
  imports: [CommonModule, FormsModule],
})
export class CarritoComponent implements OnInit {
  carrito: any = { productos: [], total: 0 };

  constructor(private carritoService: CarritoService, private router: Router) {}

  ngOnInit() {
    this.cargarCarrito();
  }

  cargarCarrito() {
    this.carritoService.obtenerCarrito().subscribe({
      next: (data) => {
        this.carrito = data;
      },
      error: (err) => {
        console.error('❌ Error al obtener el carrito', err);
        alert('❌ No se pudo cargar el carrito.');
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
      this.carrito.productos = [];
      this.carrito.total = 0;
    });
  }

  irAlCheckout() {
    if (this.carrito.productos.length === 0) {
      alert('❌ No puedes finalizar la compra con el carrito vacío.');
      return;
    }
    this.router.navigate(['/checkout']);
  }
}

