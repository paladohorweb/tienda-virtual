import { Component, OnInit } from '@angular/core';
import { CommonModule, NgFor } from '@angular/common';
import { Producto } from '../../models/producto.model';
import { ProductoService } from '../../services/producto.service';
import { CarritoService } from '../../services/carrito.service';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [CommonModule, NgFor], // ✅ Se agregó CommonModule
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'], // ✅ styleUrl → styleUrls (debe ser un array)
})
export class ProductListComponent implements OnInit {
  productos: Producto[] = [];

  constructor(private productService: ProductoService,  private carritoService: CarritoService) {}

  ngOnInit(): void {
    this.productService.obtenerProductos().subscribe({
      next: (data) => {
        this.productos = data;
      },
      error: (err) => {
        console.error('❌ Error al obtener productos', err);
      },
    });
  }

  agregarAlCarrito(productoId: number) {
    const usuarioId = Number(sessionStorage.getItem('usuarioId'));

    if (!usuarioId) {
      alert('❌ Debes iniciar sesión para agregar productos al carrito');
      return;
    }

    this.carritoService.agregarProducto(productoId, 1).subscribe({
      next: () => {
        alert('✅ Producto agregado al carrito con éxito');
      },
      error: (err) => {
        console.error('❌ Error al agregar al carrito', err);
        alert('❌ No se pudo agregar el producto al carrito');
      },
    });
  }
}



