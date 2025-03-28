import { Component, OnInit } from '@angular/core';
import { Pedido } from '../../models/pedido.model';
import { PedidoService } from '../../services/pedido.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-pedidos',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './pedidos.component.html',
  styleUrl: './pedidos.component.css'
})
export class PedidosComponent implements OnInit {
  pedidos: Pedido[] = [];

  constructor(private pedidoService: PedidoService) {}

  ngOnInit() {
    this.obtenerPedidos();
  }

  obtenerPedidos() {
    this.pedidoService.obtenerPedidos().subscribe((data) => {
      this.pedidos = data;
    });
  }

  cancelarPedido(pedidoId: number) {
    this.pedidoService.cancelarPedido(pedidoId).subscribe(() => {
      this.obtenerPedidos();
    });
  }
}
