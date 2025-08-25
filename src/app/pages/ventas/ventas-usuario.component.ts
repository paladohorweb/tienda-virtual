import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VentaService } from '../../services/venta.service';
import { Venta } from '../../models/venta.model';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-ventas-usuario',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './ventas-usuario.component.html',
})
export class VentasUsuarioComponent implements OnInit {
  ventas: Venta[] = [];
  private ventaService = inject(VentaService);
  private authService = inject(AuthService);

  ngOnInit(): void {
    const usuarioId = this.authService.getUsuarioId();
    if (usuarioId) {
      this.ventaService.listarPorUsuario(usuarioId).subscribe({
        next: (data) => {
          this.ventas = data;
        },
        error: (err) => {
          console.error('❌ Error al cargar ventas del usuario:', err);
        },
      });
    }
  }
}
