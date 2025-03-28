import { Component } from '@angular/core';
import { Pago } from '../../services/pago.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CheckoutService } from '../../services/checkout.service';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.css'
})
export class CheckoutComponent {
  pedidoId!: number;
  metodoPago: string = '';
  pagoRealizado: boolean = false;
  mensaje: string = '';

  metodosPago = ['MASTERCARD_DEBITO', 'MASTERCARD_CREDITO', 'PAYPAL', 'TRANSFERENCIA_BANCARIA'];

  constructor(
    private checkoutService: CheckoutService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.pedidoId = Number(this.route.snapshot.paramMap.get('id'));
  }

  procesarPago() {
    if (!this.metodoPago) {
      this.mensaje = 'Selecciona un método de pago';
      return;
    }

    this.checkoutService.procesarCheckout(this.pedidoId, this.metodoPago).subscribe({
      next: (pago: Pago) => {
        this.pagoRealizado = true;
        this.mensaje = 'Pago realizado con éxito';
        setTimeout(() => this.router.navigate(['/']), 3000); // Redirigir después de 3s
      },
      error: (err) => {
        this.mensaje = 'Error al procesar el pago: ' + err.error;
      },
    });
  }
}
