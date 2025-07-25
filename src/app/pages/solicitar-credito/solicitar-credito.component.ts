import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CreditoService } from '../../services/credito.service';
import { AuthService } from '../../services/auth.service';
import * as bootstrap from 'bootstrap';

@Component({
  selector: 'app-solicitar-credito',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './solicitar-credito.component.html'
})
export class SolicitarCreditoComponent implements OnInit {
  @Input() productoId!: number;
  @Input() precioProducto!: number;

  montoSolicitado: number = 0;
  cuotas: number = 3;
  mensaje: string = '';

  constructor(
    private creditoService: CreditoService,
    private auth: AuthService
  ) {}

  ngOnInit() {
    if (!this.montoSolicitado && this.precioProducto) {
      this.montoSolicitado = this.precioProducto;
    }
  }

  solicitar() {
    const userId = this.auth.getUsuarioId();

    if (userId === null) {
      this.mensaje = '❌ Usuario no autenticado';
      return;
    }

    const dto = {
      productoId: this.productoId,
      montoSolicitado: this.montoSolicitado,
      cuotas: this.cuotas
    };

    this.creditoService.solicitarCredito(userId, dto).subscribe({
      next: () => {
        this.mensaje = '✅ Solicitud enviada con éxito';
        // opcional: cerrar modal automáticamente
        const modalEl = document.getElementById('modalCredito');
        const modal = bootstrap.Modal.getInstance(modalEl!);
        modal?.hide();
      },
      error: () => {
        this.mensaje = '❌ Error al enviar la solicitud';
      }
    });
  }
}
