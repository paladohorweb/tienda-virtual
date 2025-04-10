import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CarritoService } from '../../services/carrito.service';
import { PagoService } from '../../services/pago.service';
import { DetallePedido } from '../../models/detallepedido.model';
import { Usuario } from '../../models/usuario.model';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  standalone: true,
  imports: [CommonModule, FormsModule],
})
export class CheckoutComponent implements OnInit {
  // Objeto carrito con inicialización segura
  carrito: { items: any[], total: number } = { items: [], total: 0 };

  // Métodos de pago disponibles
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
        // Asegurar que la respuesta tenga la estructura esperada
        this.carrito = {
          items: respuesta?.items || [],
          total: respuesta?.total || 0
        };
        this.cargando = false;
      },
      error: (err) => {
        console.error('Error al cargar carrito:', err);
        this.error = 'Error al cargar el carrito';
        this.cargando = false;
        this.carrito = { items: [], total: 0 }; // Reset a valores por defecto
      }
    });
  }

  finalizarCompra() {
    if (!this.usuario || this.carrito.items.length === 0) {
      alert('Debes iniciar sesión y agregar productos al carrito');
      return;
    }

    const pedido = {
      id: 0,
      usuario: this.usuario,
      fechaPedido: new Date().toISOString(),
      estado: 'PENDIENTE',
      total: this.carrito.total,
      detalles: this.carrito.items.map(item => ({
        id: 0,
        pedidoId: 0,
        producto: item.producto,
        cantidad: item.cantidad,
        precioUnitario: item.producto.precio,
        subtotal: item.producto.precio * item.cantidad
      }))
    };

    this.pagoService.crearPedido(pedido).subscribe({
      next: (nuevoPedido) => {
        console.log('✅ Pedido creado:', nuevoPedido);

        // Procesar pago (aquí puedes cambiar el método de pago)
        const metodoPago = 'MASTERCARD_CREDITO';

        this.pagoService.procesarPago(nuevoPedido.id, metodoPago).subscribe({
          next: (respuestaPago) => {
            console.log('✅ Pago exitoso:', respuestaPago);
            alert('Compra finalizada con éxito');
            this.carritoService.vaciarCarrito();
            this.router.navigate(['/']);
          },
          error: (err) => {
            console.error('❌ Error al procesar pago:', err);
            alert('Error al procesar el pago');
          }
        });
      },
      error: (err) => {
        console.error('❌ Error al crear pedido:', err);
        alert('No se pudo crear el pedido');
      }
    });
  }

  private procesarPago(pedidoId: number): void {
    this.pagoService.procesarPago(pedidoId, this.metodoPago).subscribe({
      next: () => {
        this.cargando = false;
        this.router.navigate(['/confirmacion', pedidoId]);
        this.carritoService.limpiarCarrito();
      },
      error: (err) => {
        this.cargando = false;
        this.error = err.error?.message || 'Error al procesar el pago';
      }
    });
  }
}


