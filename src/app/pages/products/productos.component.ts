import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';


import { Modal } from 'bootstrap';
import { Router } from '@angular/router';
import { Producto } from '../../models/producto.model';
import { ProductoService } from '../../services/producto.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './productos.component.html'
})
export class ProductosComponent implements OnInit {


agregarAlCarrito(producto: Producto) {
  console.log("Producto agregado:", producto);
  // Aquí deberías llamar a un servicio de carrito
}
  productos: Producto[] = [];
  productosFiltrados: Producto[] = [];
  filtro: string = '';

  constructor(private productoService: ProductoService) {}

  ngOnInit(): void {
    this.obtenerProductos();
  }

  obtenerProductos() {
    this.productoService.obtenerProductos().subscribe((data) => {
      this.productos = data;
      this.productosFiltrados = data;  // 🔹 Inicializa los productos filtrados
    });
  }

  filtrarProductos() {
    this.productosFiltrados = this.productos.filter((p) =>
      p.nombre.toLowerCase().includes(this.filtro.toLowerCase())
    );
  }
}



