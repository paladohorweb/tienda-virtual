import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VentaService } from '../../services/venta.service';
import { Venta } from '../../models/venta.model';

@Component({
  selector: 'app-ventas-admin',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './ventas-admin.component.html',
})
export class VentasAdminComponent implements OnInit {
  ventas: Venta[] = [];
  private ventaService = inject(VentaService);

  ngOnInit(): void {
    this.ventaService.listarTodas().subscribe({
      next: (data) => {
        this.ventas = data;
      },
      error: (err) => {
        console.error('❌ Error al cargar todas las ventas:', err);
      },
    });
  }
}
