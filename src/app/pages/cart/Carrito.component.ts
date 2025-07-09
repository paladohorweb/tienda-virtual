import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { CarritoService } from '../../services/carrito.service';
import { Carrito } from '../../models/carrito.model';
import { Rol } from '../../models/usuario.model';

@Component({
  selector: 'app-carrito',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './carrito.component.html'
})
export class CarritoComponent implements OnInit {
  carrito: Carrito | null = null;
  usuarioId: number | null = null;

  constructor(private carritoService: CarritoService, private router: Router) {}

  ngOnInit() {
    this.usuarioId = Number(sessionStorage.getItem('usuarioId'));
    if (!this.usuarioId) {
      alert('❌ Debes iniciar sesión para ver tu carrito');
      this.router.navigate(['/login']);
      return;
    }
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

 modificarCantidad(productoId: number, nuevaCantidad: number) {
  const item = this.carrito?.items.find(i => i.producto.id === productoId);
  if (!item) return;

  const diferencia = nuevaCantidad - item.cantidad;

  if (nuevaCantidad < 1) {
    if (confirm('¿Deseas eliminar este producto del carrito?')) {
      this.eliminarProducto(productoId);
    }
    return;
  }

  this.carritoService.agregarProducto(productoId, diferencia).subscribe({
    next: () => this.cargarCarrito(),
    error: (err) => console.error('❌ Error al modificar cantidad', err)
  });
}

  eliminarProducto(productoId: number) {
    this.carritoService.eliminarProducto(productoId).subscribe(() => {
      this.cargarCarrito();
    });
  }

  vaciarCarrito() {
    this.carritoService.vaciarCarrito().subscribe(() => {
      this.carrito = {
        id: 0,
        usuario: {
          id: this.usuarioId!,
          email: '',
          password: '',
          rol: Rol.ADMIN
        },
        items: [],
        total: 0
      };
    });
  }

  irAlCheckout() {
    if (!this.carrito || this.carrito.items.length === 0) {
      alert('❌ No puedes finalizar la compra con el carrito vacío.');
      return;
    }
    this.router.navigate(['/checkout']);
  }
}
