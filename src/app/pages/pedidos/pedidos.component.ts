import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Pedido } from '../../models/pedido.model';
import { PedidoService } from '../../services/pedido.service';


@Component({
  selector: 'app-pedidos',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './pedidos.component.html',
  styleUrls: ['./pedidos.component.css'],
})
export class PedidoComponent implements OnInit {
  pedidos: Pedido[] = [];
  errorMessage = '';

  constructor(private pedidoService: PedidoService) {}

  ngOnInit(): void {
    this.obtenerPedidos();
  }

  obtenerPedidos() {
    this.pedidoService.obtenerPedidos().subscribe({
      next: (pedidos) => (this.pedidos = pedidos),
      error: (err) => {
        console.error('❌ Error al obtener pedidos:', err);
        this.errorMessage = 'No se pudieron cargar los pedidos.';
      },
    });
  }
}

