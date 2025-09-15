import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { Producto } from '../../models/producto.model';
import { ProductoService } from '../../services/producto.service';
import { FormsModule } from '@angular/forms';
import { CarritoService } from '../../services/carrito.service';
import { AuthService } from '../../services/auth.service';
import { ModalSolicitarCreditoComponent } from '../../components/modal-solicitar-credito/modal-solicitar-credito.component';
import * as bootstrap from 'bootstrap';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-productos',
  standalone: true,
  imports: [CommonModule, FormsModule, ModalSolicitarCreditoComponent],
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.css'],
})
export class ProductosComponent implements OnInit {
  productos: Producto[] = [];
  productosFiltrados: Producto[] = [];
  filtro: string = '';
  totalArticulos: number = 0;
  isAuthenticated = false;
  productoSeleccionadoId!: number;
  montoSolicitado!: number;

  // 🔹 Para el modal de imagen

  imagenSeleccionada: string = '';



  constructor(
    private productoService: ProductoService,
    private carritoService: CarritoService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.obtenerProductos();
    this.obtenerCantidadArticulos();
    this.isAuthenticated = this.authService.isAuthenticated();
  }

  obtenerProductos() {
    this.productoService.obtenerProductos().subscribe((data) => {
      this.productos = data;
      this.productosFiltrados = data;
    });
  }

  filtrarProductos() {
    this.productosFiltrados = this.productos.filter((p) =>
      p.nombre.toLowerCase().includes(this.filtro.toLowerCase())
    );
  }

  agregarAlCarrito(producto: Producto) {
    if (!this.authService.isAuthenticated()) {
      Swal.fire({
        title: '❌ Debes iniciar sesión para agregar productos al carrito',
        icon: 'error',
        draggable: true,
      });
      this.router.navigate(['/login']);
      return;
    }

    this.carritoService.agregarProducto(producto.id, 1).subscribe({
      next: () => {
        Swal.fire({
          title: 'Producto Agregado al Carrito!',
          text: 'Continua!',
          icon: 'success',
        });
        this.obtenerCantidadArticulos();
      },
      error: (err) => {
        console.error('❌ Error al agregar al carrito', err);
        alert('❌ No se pudo agregar el producto al carrito');
      },
    });
  }

  obtenerCantidadArticulos() {
    this.carritoService.obtenerCantidadTotal().subscribe({
      next: (cantidad: number) => {
        this.totalArticulos = cantidad;
      },
      error: () => {
        this.totalArticulos = 0;
      },
    });
  }

  abrirModal(productId: number, precio: number) {
    this.productoSeleccionadoId = productId;
    this.montoSolicitado = precio;
    const modal = new bootstrap.Modal(document.getElementById('modalCredito')!);
    modal.show();
  }

  // 🔹 Nuevo: Modal para ver imagen grande
  abrirModalImagen(imagenUrl: string) {
    this.imagenSeleccionada = imagenUrl;
    const modal = new bootstrap.Modal(document.getElementById('modalImagen')!);
    modal.show();
  }

  abrirImagen(product: Producto) {
  this.imagenSeleccionada = product.imagenUrl;
  const modal = new bootstrap.Modal(document.getElementById('imageModal')!);
  modal.show();
}
}
