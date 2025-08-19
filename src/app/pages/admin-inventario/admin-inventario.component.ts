// src/app/pages/admin-inventario/admin-inventario.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { ProductoService } from '../../services/producto.service';
import { Producto } from '../../models/producto.model';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { MovimientoInventarioRequest, MovimientoInventarioResponse, TipoMovimiento } from '../../models/movimiento-iventario.models';
import { InventarioService } from '../../services/InventarioService.service';

@Component({
  selector: 'app-admin-inventario',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule, RouterModule],
  templateUrl: './admin-inventario.component.html',
  styleUrls: ['./admin-inventario.component.css']
})
export class AdminInventarioComponent implements OnInit {
  productos: Producto[] = [];
  movimientos: MovimientoInventarioResponse[] = [];
  loading = false;
  error: string | null = null;

  form = this.fb.group({
    productoId: [null, Validators.required],
    cantidad: [1, [Validators.required, Validators.min(1)]],
    tipo: ['SALIDA', Validators.required],
    motivo: ['', Validators.maxLength(250)]
  });

  tipos: TipoMovimiento[] = ['ENTRADA', 'SALIDA', 'AJUSTE'];

  constructor(
    private invService: InventarioService,
    private productoService: ProductoService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.cargarProductos();
    this.cargarMovimientos();
    // suscribirse a actualizaciones si otra parte actualiza inventario
    this.invService.movimientosObservable$.subscribe(list => this.movimientos = list);
  }

  cargarProductos() {
    this.productoService.obtenerProductos().subscribe({
      next: p => this.productos = p,
      error: err => this.error = 'No se pudo cargar productos'
    });
  }

  cargarMovimientos() {
    this.loading = true;
    this.invService.listarMovimientos().subscribe({
      next: list => { this.movimientos = list; this.loading = false; },
      error: err => { this.error = 'No se pudo cargar movimientos'; this.loading = false; }
    });
  }

submit() {
  if (this.form.invalid) return;
  this.error = null;
  const val = this.form.value;

  const payload: MovimientoInventarioRequest = {
    productoId: Number(val.productoId),
    cantidad: Number(val.cantidad),
    tipo: (val.tipo as TipoMovimiento) ?? 'SALIDA', // fallback seguro
    motivo: val.motivo ?? '',
    usuario: '' // o desde el backend usando JWT
  };

  this.invService.registrarMovimiento(payload).subscribe({
    next: res => {
      this.form.patchValue({ cantidad: 1, motivo: '' });
    },
    error: err => {
      console.error(err);
      this.error = err?.error || 'Error registrando movimiento';
    }
  });
}

  verPorProducto(productoId: number) {
    this.invService.listarPorProducto(productoId).subscribe({
      next: list => this.movimientos = list,
      error: err => this.error = 'No se pudo cargar movimientos por producto'
    });
  }

  marcarBajoStock() {
    this.invService.bajoStock(5).subscribe({
      next: list => {
        // si quieres inyectar la lista de productos bajo stock en UI
        console.log('Productos bajo stock:', list);
        alert(`Productos con stock <= 5: ${list.length}`);
      },
      error: () => alert('Error consultando productos bajo stock')
    });
  }
}
