import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CarritoService } from '../../services/carrito.service';
import { PagoService } from '../../services/pago.service';
import { Usuario } from '../../models/usuario.model';
import { AuthService } from '../../services/auth.service';
import { PedidoService } from '../../services/pedido.service';

@Component({
  selector: 'app-checkout',
  standalone: true,
  templateUrl: './checkout.component.html',
  imports: [CommonModule, FormsModule],
})
export class CheckoutComponent implements OnInit {
  carrito: { items: any[]; total: number } = { items: [], total: 0 };

  metodosPago = [
    { value: 'mastercard_credito', label: '💳 Mastercard Crédito' },
    { value: 'mastercard_debito', label: '💳 Mastercard Débito' },
    { value: 'paypal', label: '🅿️ PayPal' },
    { value: 'transferencia', label: '🏦 Transferencia Bancaria' }
  ];

  metodoPago: string = this.metodosPago[0].value;
  cargando = false;
  error: string | null = null;
  usuario!: Usuario;

  constructor(
    private pedidoService: PedidoService,
    private authService: AuthService,
    private carritoService: CarritoService,
    private pagoService: PagoService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.usuario = this.authService.getUsuario();
    this.cargarCarrito();
  }

  cargarCarrito(): void {
    this.cargando = true;
    this.carritoService.obtenerCarrito().subscribe({
      next: (respuesta: any) => {
        this.carrito = {
          items: respuesta?.items || [],
          total: respuesta?.total || 0
        };
        this.cargando = false;
      },
      error: (err) => {
        console.error('❌ Error al cargar carrito:', err);
        this.error = 'Error al cargar el carrito';
        this.cargando = false;
        this.carrito = { items: [], total: 0 };
      }
    });
  }

  finalizarCompra(): void {
    if (!this.usuario || this.carrito.items.length === 0) {
      alert('Debes iniciar sesión y agregar productos al carrito');
      return;
    }

    this.cargando = true;
    this.error = null;

    const detalles = this.carrito.items.map(item => ({
      productoId: item.producto.id,
      cantidad: item.cantidad,
      precioUnitario: item.producto.precio
    }));

    this.pedidoService.crearPedido(detalles).subscribe({
      next: (res) => {
        const pedidoId = res.data.id;
        this.procesarPago(pedidoId);

      },
      error: (err) => {
        console.error('❌ Falló la creación del pedido:', err);
        this.cargando = false;
        this.error = 'No se pudo completar el pedido. Intenta más tarde.';
      }
    });
  }

  private procesarPago(pedidoId: number): void {
    this.pagoService.procesarPago(pedidoId, this.metodoPago).subscribe({
      next: () => {
        console.log('✔️ Pago exitoso');
        this.carritoService.limpiarCarrito().subscribe({
          next: () => {
            console.log('🛒 Carrito vaciado con éxito');
            this.cargando = false;
            this.router.navigate(['/confirmacion', pedidoId]);
          },
          error: (err) => {
            console.error('⚠️ Error al vaciar el carrito:', err);
            this.cargando = false;
            this.error = 'Pago realizado, pero hubo un problema al vaciar el carrito.';
          }
        });
      },
      error: (err) => {
        console.error('❌ Error al procesar pago:', err);
        this.cargando = false;
        this.error = err.error?.message || 'Ocurrió un error al procesar el pago';
      }
    });
  }

}


