import { FacturaDto } from './../models/factura.dto';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { AuthService } from './auth.service';
import { Pedido } from '../models/pedido.model';
import { DetallePedidoRequest } from '../models/detallePedidoRequest';


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

  /** 🔹 Crear un pedido */
  crearPedido(detalles: DetallePedidoRequest[]): Observable<PedidoResponse> {
    const usuarioId = sessionStorage.getItem('usuarioId');
    if (!usuarioId) {
      return throwError(() => new Error('Usuario no autenticado'));
    }

    return this.http.post<PedidoResponse>(
      `${this.apiUrl}/crearPedido`,
      {
        usuarioId: Number(usuarioId),
        detalles: detalles
      },
      { headers: this.getAuthHeaders() }
    ).pipe(
      tap(response => {
        console.log('✅ Pedido creado exitosamente:', response.data);
        sessionStorage.setItem('ultimoPedidoId', response.data.id.toString());
      }),
      catchError(error => {
        console.error('❌ Error al crear pedido:', error);
        return throwError(() => this.handleError(error));
      })
    );
  }

  /** 🔹 Obtener pedidos del usuario */
  obtenerPedidos(): Observable<Pedido[]> {
    const usuarioId = sessionStorage.getItem('usuarioId');
    if (!usuarioId) {
      return throwError(() => new Error('Usuario no autenticado'));
    }

    return this.http
      .get<Pedido[]>(`${this.apiUrl}/usuario/${usuarioId}`, {
        headers: this.getAuthHeaders()
      })
      .pipe(
        tap(pedidos => console.log('✅ Pedidos obtenidos:', pedidos)),
        catchError(err => {
          console.error('❌ Error al obtener pedidos:', err);
          return throwError(() => new Error('Error al obtener pedidos'));
        })
      );
  }

  /** 🔹 Obtener un pedido por ID */
  obtenerPedidoPorId(pedidoId: number): Observable<Pedido> {
    return this.http
      .get<Pedido>(`${this.apiUrl}/${pedidoId}`, {
        headers: this.getAuthHeaders()
      })
      .pipe(
        tap(pedido => console.log('✅ Pedido obtenido:', pedido)),
        catchError(err => {
          console.error('❌ Error al obtener pedido:', err);
          return throwError(() => new Error('Error al obtener pedido'));
        })
      );
  }

  private handleError(error: any): Error {
    if (error.error?.message) {
      return new Error(error.error.message);
    }
    return new Error(error.message || 'Error desconocido en el servidor');
  }

  generarFactura(pedidoId: number): Observable<FacturaDto> {
  const url = `${environment.apiUrl}/facturas/pedido/${pedidoId}`;
  return this.http.get<FacturaDto>(url, {
    headers: this.getAuthHeaders()
  });
}

    /** 🔹 Cancelar un pedido */
cancelarPedido(pedidoId: number): Observable<any> {
  return this.http.put<any>(
    `${this.apiUrl}/cancelar/${pedidoId}`,
    {}, // cuerpo vacío
    { headers: this.getAuthHeaders() }
  );
}

/** 🔹 Pagar un pedido pendiente */
pagarPedido(pedidoId: number): Observable<any> {
  return this.http.put<any>(
    `${this.apiUrl}/pagar/${pedidoId}`,
    {}, // cuerpo vacío, si solo envías ID por path
    {
      headers: this.getAuthHeaders()
    }
  ).pipe(
    tap(res => console.log('✅ Pedido pagado:', res)),
    catchError(error => {
      console.error('❌ Error al pagar pedido:', error);
      return throwError(() => error);
    })
  );
}

}




