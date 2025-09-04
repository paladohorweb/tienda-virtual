import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { FacturaDto } from '../models/factura.dto';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class FacturaService {

  private apiUrl = `${environment.apiUrl}/api/facturas`;

  constructor(private http: HttpClient, private authService: AuthService) {}

private getAuthHeaders(): HttpHeaders {
  const token = this.authService.getToken();
  return new HttpHeaders({
    'Authorization': `Bearer ${token}`
  });
}

    generarFactura(pedidoId: number): Observable<FacturaDto> {
  const url = `${this.apiUrl}/generar/${pedidoId}`;
  return this.http.post<FacturaDto>(url, null, {
    headers: this.getAuthHeaders()
  });
}
  obtenerFacturaPorPedido(pedidoId: number): Observable<FacturaDto> {
    return this.http.get<FacturaDto>(`${this.apiUrl}/pedido/${pedidoId}`, {
      headers: this.getAuthHeaders()
    });
  }
}

