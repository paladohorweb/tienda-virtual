import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PagoService } from '../../services/pago.service';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-pago',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './pago.component.html'

})
export class PagoComponent {
  @Input() pedidoId!: number;
  metodoPago = 'Mastercard Débito';
  mensaje = '';

  constructor(private pagoService: PagoService) {}

  procesarPago() {
    if (!this.pedidoId) {
      this.mensaje = '❌ No se encontró un pedido válido';
      return;
    }

    this.pagoService.procesarPago(this.pedidoId, this.metodoPago).subscribe({
      next: (res) => (this.mensaje = '✅ Pago procesado correctamente'),
      error: (err) => {
        console.error('❌ Error al procesar pago:', err);
        this.mensaje = '❌ Error al procesar pago';
      },
    });
  }
}

