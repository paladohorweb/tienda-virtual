import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

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
    const url = `${this.apiUrl}/${pedidoId}?metodoPago=${metodoPago}`;
    return this.http.post<Pago>(url, {});
  }
}


