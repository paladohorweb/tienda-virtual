import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Pedido } from '../models/pedido.model';

@Injectable({
  providedIn: 'root',
})
export class PedidoService {
  private apiUrl = `${environment.apiUrl}/pedidos`;

  constructor(private http: HttpClient) {}

  obtenerPedidos(): Observable<Pedido[]> {
    return this.http.get<Pedido[]>(`${this.apiUrl}/usuario`);
  }

  cancelarPedido(pedidoId: number): Observable<any> {
    return this.http.put(`${this.apiUrl}/cancelar/${pedidoId}`, {});
  }
}

