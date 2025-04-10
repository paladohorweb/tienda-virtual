import { DetallePedido } from './../models/detallepedido.model';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { AuthService } from './auth.service';
import { Pedido } from '../models/pedido.model';


interface PedidoResponse {
  status: string;
  code: number;
  message: string;
  data: {
    id: number;
    fecha: string;
    total: number;
    estado: string;
  };
}

@Injectable({
  providedIn: 'root'
})
export class PedidoService {
  private apiUrl = `${environment.apiUrl}/pedidos`;

  constructor(private http: HttpClient, private authService: AuthService) {}

  private getAuthHeaders(): HttpHeaders {
    const token = this.authService.getToken();
    if (!token) {
      throw new Error('No hay token de autenticación disponible');
    }
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });
  }

  crearPedido(detallePedido: DetallePedido[]): Observable<PedidoResponse> {
    const usuarioId = sessionStorage.getItem('usuarioId');
    if (!usuarioId) {
      return throwError(() => new Error('Usuario no autenticado'));
    }

    return this.http.post<PedidoResponse>(
      `${this.apiUrl}/crearPedido`,
      {
        usuarioId: Number(usuarioId),
        detalles: detallePedido.map(d => ({
          productoId: d.producto.id,
          cantidad: d.cantidad,
          precioUnitario: d.producto.precio
        }))
      },
      { headers: this.getAuthHeaders() }
    ).pipe(
      tap(response => {
        console.log('Pedido creado exitosamente:', response.data);
        sessionStorage.setItem('ultimoPedidoId', response.data.id.toString());
      }),
      catchError(error => {
        console.error('Error al crear pedido:', error);
        return throwError(() => this.handleError(error));
      })
    );
  }

  private handleError(error: any): Error {
    if (error.error?.message) {
      return new Error(error.error.message);
    }
    return new Error(error.message || 'Error desconocido en el servidor');
  }

  /** 🔹 Obtener pedidos del usuario */
  obtenerPedidos(): Observable<Pedido[]> {
    const usuarioId = sessionStorage.getItem('usuarioId');
    if (!usuarioId) {
      return throwError(() => new Error('Usuario no autenticado'));
    }

    return this.http
      .get<Pedido[]>(`${this.apiUrl}/usuario/${usuarioId}`, { headers: this.getAuthHeaders() })
      .pipe(
        tap((pedidos) => console.log('✅ Pedidos obtenidos:', pedidos)),
        catchError((err) => {
          console.error('❌ Error al obtener pedidos:', err);
          return throwError(() => new Error('Error al obtener pedidos'));
        })
      );
  }

  /** 🔹 Obtener un pedido por ID */
  obtenerPedidoPorId(pedidoId: number): Observable<Pedido> {
    return this.http
      .get<Pedido>(`${this.apiUrl}/${pedidoId}`, { headers: this.getAuthHeaders() })
      .pipe(
        tap((pedido) => console.log('✅ Pedido obtenido:', pedido)),
        catchError((err) => {
          console.error('❌ Error al obtener pedido:', err);
          return throwError(() => new Error('Error al obtener pedido'));
        })
      );
  }

  /** 🔹 Procesar pago de un pedido */
  procesarPago(idPedido: number, metodoPago: string): Observable<void> {
    return this.http
      .post<void>(`${this.apiUrl}/procesar-pago/${idPedido}`, { metodoPago }, { headers: this.getAuthHeaders() })
      .pipe(
        tap(() => console.log('✅ Pago procesado con éxito')),
        catchError((err) => {
          console.error('❌ Error al procesar pago:', err);
          return throwError(() => new Error('Error al procesar pago'));
        })
      );
  }
}



