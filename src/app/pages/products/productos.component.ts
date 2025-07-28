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

@Component({
  selector: 'app-productos',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ModalSolicitarCreditoComponent
],
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.css'], // Asegúrate de tenerlo creado
})
export class ProductosComponent implements OnInit {
  productos: Producto[] = [];
  productosFiltrados: Producto[] = [];
  filtro: string = '';
  totalArticulos: number = 0; // Contador del carrito
  isAuthenticated = false;
  productoSeleccionadoId!: number;
  montoSolicitado!: number;

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
      alert('❌ Debes iniciar sesión para agregar productos al carrito');
      this.router.navigate(['/login']);
      return;
    }

    this.carritoService.agregarProducto(producto.id, 1).subscribe({
      next: () => {
        alert('✅ Producto agregado al carrito');
        this.obtenerCantidadArticulos(); // actualizar contador
        //this.router.navigate(['/carrito']);
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
  this.montoSolicitado = precio; // ✅ pasar el precio como monto sugerido
  const modal = new bootstrap.Modal(document.getElementById('modalCredito')!);
  modal.show();
}
}
