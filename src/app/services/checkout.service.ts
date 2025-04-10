import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, Observable } from 'rxjs';

import { Pago } from '../models/pago.model';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CheckoutService {
  private apiUrl = `${environment.apiUrl}/checkout`; // URL del backend

  constructor(private http: HttpClient) {}

  /**
   * Procesa el checkout y realiza el pago
   * @param pedidoId ID del pedido a procesar
   * @param metodoPago Método de pago seleccionado
   * @returns Observable con el resultado del pago
   */
  procesarCheckout(pedidoId: number, metodoPago: string): Observable<Pago> {
    return this.http.post<Pago>(
      `${environment.apiUrl}/api/checkout`,
      null,
      {
        params: {
          pedidoId: pedidoId.toString(),
          metodoPago: metodoPago
        }
      }
    ).pipe(
      catchError(error => {
        // Mapeo de errores específicos
        if (error.status === 404) {
          throw new Error('Pedido no encontrado');
        }
        if (error.error?.message?.includes('Stock insuficiente')) {
          throw new Error(error.error.message);
        }
        throw new Error('Error al procesar el pago');
      })
    );
  }
}


