import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class PagoService {
  private apiUrl = `${environment.apiUrl}/pagos`;

  constructor(private http: HttpClient, private authService: AuthService) {}

  /** 🔹 Obtener token */
  private getAuthHeaders(): HttpHeaders {
    const token = this.authService.getToken();
    if (!token) {
      console.error('❌ No se encontró el token');
      return new HttpHeaders();
    }
    return new HttpHeaders({
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    });
  }

  /** 🔹 Procesar pago */
  procesarPago(pedidoId: number, metodoPago: string): Observable<any> {
    const params = { metodoPago };

    return this.http.post<any>(
      `${this.apiUrl}/procesar/${pedidoId}`,
      null,
      {
        headers: this.getAuthHeaders(),
        params,
      }
    ).pipe(
      tap((res) => console.log('✅ Pago procesado:', res)),
      catchError((err) => {
        console.error('❌ Error al procesar pago:', err);
        return throwError(() => new Error('Error al procesar pago'));
      })
    );
  }
}


