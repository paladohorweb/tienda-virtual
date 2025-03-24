import { Component } from '@angular/core';
import { PagoService, MetodoPago, Pago } from '../../services/pago.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.css'
})
export class CheckoutComponent {
  pedidoId!: number;
  total: number = 0;
  metodoPago!: MetodoPago;
  metodosPago = Object.values(MetodoPago);
  procesandoPago = false;
  mensajePago = '';
  pagoExitoso = false;

  constructor(private pagoService: PagoService, private route: ActivatedRoute, private router: Router) {}

  ngOnInit() {
    this.pedidoId = Number(this.route.snapshot.paramMap.get('pedidoId'));
    this.total = Number(this.route.snapshot.queryParamMap.get('total'));
  }

  procesarPago() {
    if (!this.metodoPago) {
      this.mensajePago = '❌ Seleccione un método de pago.';
      this.pagoExitoso = false;
      return;
    }

    this.procesandoPago = true;
    this.mensajePago = '';

    this.pagoService.procesarPago(this.pedidoId, this.metodoPago).subscribe({
      next: (pago: Pago) => {
        this.pagoExitoso = pago.estado === 'COMPLETADO';
        this.mensajePago = this.pagoExitoso
          ? '✅ Pago realizado con éxito.'
          : '⚠️ El pago está pendiente de confirmación.';
        this.procesandoPago = false;

        if (this.pagoExitoso) {
          setTimeout(() => this.router.navigate(['/']), 3000);
        }
      },
      error: () => {
        this.mensajePago = '❌ Error al procesar el pago.';
        this.pagoExitoso = false;
        this.procesandoPago = false;
      }
    });
  }
}

