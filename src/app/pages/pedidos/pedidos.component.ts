import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Pedido} from '../../models/pedido.model';
import { PedidoService } from '../../services/pedido.service';
import { RouterModule } from '@angular/router';
import { EstadoPedido } from '../../models/estadopedido.model';

@Component({
  selector: 'app-pedidos',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './pedidos.component.html',
  styleUrls: ['./pedidos.component.css'],
})
export class PedidoComponent implements OnInit {
  pedidos: Pedido[] = [];
  errorMessage = '';
 public  EstadoPedido = EstadoPedido; // Para usarlo en el HTML

  constructor(private pedidoService: PedidoService) {}

  ngOnInit(): void {
    this.obtenerPedidos();
  }

  obtenerPedidos(): void {
    this.pedidoService.obtenerPedidos().subscribe({
      next: (pedidos) => {
        this.pedidos = pedidos.sort((a, b) => b.id - a.id);
      },
      error: (err) => {
        console.error('❌ Error al obtener pedidos:', err);
        this.errorMessage = 'No se pudieron cargar los pedidos.';
      },
    });
  }

  verFactura(pedidoId: number): void {
    window.open(`/factura/${pedidoId}`, '_blank');
  }


  pagarPedido(pedidoId: number): void {
  if (!confirm(`¿Estás seguro de que deseas pagar el pedido #${pedidoId}?`)) return;

  this.pedidoService.pagarPedido(pedidoId).subscribe({
    next: () => {
      alert('✅ Pedido pagado con éxito');
      this.obtenerPedidos();
    },
    error: (err) => {
      alert('❌ Error al pagar pedido: ' + err.message);
    }
  });
}

cancelarPedido(pedidoId: number): void {
  if (!confirm(`¿Deseas cancelar el pedido #${pedidoId}? Esta acción no se puede deshacer.`)) return;

  this.pedidoService.cancelarPedido(pedidoId).subscribe({
    next: () => {
      alert('🛑 Pedido cancelado correctamente');
      this.obtenerPedidos();
    },
    error: (err) => {
      alert('❌ Error al cancelar pedido: ' + err.message);
    }
  });
}
   esPendiente(pedido: Pedido): boolean {
  return pedido.estado === EstadoPedido.PENDIENTE;
}

}
