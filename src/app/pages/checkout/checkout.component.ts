import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CarritoService } from '../../services/carrito.service';
import { PagoService } from '../../services/pago.service';
import { Usuario } from '../../models/usuario.model';
import { AuthService } from '../../services/auth.service';
import { PedidoService } from '../../services/pedido.service';
import { CreditoService } from '../../services/credito.service';

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
    { value: 'transferencia_bancaria', label: '🏦 Transferencia Bancaria' },
    { value: 'credito', label: '💰 Crédito' } // <- nueva opción
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
    private router: Router,
      private creditoService: CreditoService, // nuevo
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

        if(this.metodoPago === 'credito'){
           this.solicitarCreditoDesdeCheckout(pedidoId);
        }else {
          this.procesarPago(pedidoId);
        }


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

      // ✅ Generar la factura
      this.pedidoService.generarFactura(pedidoId).subscribe({
        next: () => {
          console.log('🧾 Factura generada automáticamente');
          // ✅ Limpiar carrito
          this.carritoService.vaciarCarrito().subscribe({
            next: () => {
              this.cargando = false;
              //this.router.navigate(['/factura', pedidoId]); // Redirige a página de factura
              // Redirigir primero a la página de confirmación
              this.router.navigate(['/confirmacion', pedidoId]);
            },
            error: (err: any) => {
              console.error('⚠️ Error al vaciar el carrito:', err);
              this.cargando = false;
              this.error = 'Pago realizado, pero hubo un problema al vaciar el carrito.';
            }
          });
        },
        error: (err) => {
          console.error('❌ Error al generar la factura:', err);
          this.cargando = false;
          this.error = 'El pago fue exitoso, pero no se pudo generar la factura.';
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

   private solicitarCreditoDesdeCheckout(pedidoId: number): void {
  if (!this.carrito.items.length) {
    this.error = 'No hay productos en el carrito para solicitar crédito.';
    return;
  }

  const productoId = this.carrito.items[0].producto.id; // por ahora, solo un producto
  const montoSolicitado = this.carrito.total;
  const cuotas = 3;

  const userId = this.authService.getUsuarioId();
  if (userId === null) {
    this.error = 'Usuario no autenticado';
    return;
  }

  const dto = { productoId, montoSolicitado, cuotas };

  this.creditoService.solicitarCredito(userId, dto).subscribe({
    next: () => {
      this.carritoService.vaciarCarrito().subscribe(() => {
        this.cargando = false;
        this.router.navigate(['/confirmacion', pedidoId]);
      });
    },
    error: (err) => {
      console.error('❌ Error al solicitar crédito desde checkout:', err);
      this.cargando = false;
      this.error = 'No se pudo procesar la solicitud de crédito.';
    }
  });
}

}


