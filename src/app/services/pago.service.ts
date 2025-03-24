import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export enum MetodoPago {
  MASTERCARD_DEBITO = 'MASTERCARD_DEBITO',
  MASTERCARD_CREDITO = 'MASTERCARD_CREDITO',
  PAYPAL = 'PAYPAL',
  TRANSFERENCIA_BANCARIA = 'TRANSFERENCIA_BANCARIA'
}

export interface Pago {
  id?: number;
  pedidoId: number;
  metodoPago: MetodoPago;
  monto: number;
  fechaPago?: string;
  estado?: string;
}

@Injectable({
  providedIn: 'root'
})
export class PagoService {
  private apiUrl = 'http://localhost:8080/api/pagos'; // URL del backend

  constructor(private http: HttpClient) {}

  procesarPago(pedidoId: number, metodoPago: MetodoPago): Observable<Pago> {
    return this.http.post<Pago>(`${this.apiUrl}/procesar/${pedidoId}`, metodoPago);
  }

  actualizarEstadoPago(pagoId: number, estadoPago: string): Observable<Pago> {
    return this.http.put<Pago>(`${this.apiUrl}/actualizar/${pagoId}?estadoPago=${estadoPago}`, {});
  }
}

