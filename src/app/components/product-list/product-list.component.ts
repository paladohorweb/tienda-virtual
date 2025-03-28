import { Component, OnInit } from '@angular/core';


import { NgFor } from '@angular/common'; // 👈 Importa NgFor
import { Producto } from '../../models/producto.model';
import { ProductoService } from '../../services/producto.service';


@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [NgFor],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css'
})


export class ProductListComponent  implements OnInit{
  productos: Producto[] = [];

  constructor(private productService: ProductoService) {}

  ngOnInit(): void {
    this.productService.obtenerProductos().subscribe(data => {
      this.productos = data;
    });
  }
}
