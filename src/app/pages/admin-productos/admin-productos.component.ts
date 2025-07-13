import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AdminProductoService } from '../../services/admin-producto.service';
import { Producto } from '../../models/producto.model';

@Component({
  selector: 'app-admin-productos',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './admin-productos.component.html'
})
export class AdminProductosComponent implements OnInit {
  productos: Producto[] = [];
  modelo: Producto = { id: 0, nombre: '', descripcion: '', precio: 0, stock: 0, imagenUrl: '' };
  editando = false;

  constructor(private svc: AdminProductoService) {}

  ngOnInit() { this.cargar(); }

  cargar() {
    this.svc.listar().subscribe(data => this.productos = data);
  }

  editar(p: Producto) {
    this.modelo = { ...p };
    this.editando = true;
  }

  nuevo() {
    this.modelo = { id:0, nombre:'', descripcion:'', precio:0, stock:0, imagenUrl:'' };
    this.editando = true;
  }

  guardar() {
    const obs = this.modelo.id ? this.svc.actualizar(this.modelo) : this.svc.crear(this.modelo);
    obs.subscribe(() => { this.editando = false; this.cargar(); });
  }

  eliminar(id: number) {
    if (confirm('¿Eliminar producto?')) {
      this.svc.eliminar(id).subscribe(() => this.cargar());
    }
  }
}
