import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class PagoService {

  private apiUrl = `${environment.apiUrl}/pagos`;

  constructor(private http: HttpClient, private authService: AuthService) {}

  /** 🔹 Obtener token de autenticación */
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
    const params = { metodoPago }; // Solo pasamos el método de pago como parámetro de consulta

    return this.http.post<any>(
      `${this.apiUrl}/procesar/${pedidoId}`, // Enviamos el pedidoId como parte de la URL
      null, // No es necesario enviar un cuerpo vacío (puedes usar null o dejarlo vacío)
      { headers: this.getAuthHeaders(), params } // Aquí enviamos el 'metodoPago' como parámetros de la consulta
    ).pipe(
      tap((res) => console.log('✅ Pago procesado:', res)),
      catchError((err) => {
        console.error('❌ Error al procesar pago:', err);
        return throwError(() => new Error('Error al procesar pago'));
      })
    );
  }
  crearPedido(carrito: any): Observable<any> {
    return this.http.post<any>(
      `${this.apiUrl}/crearPedido`, // Ruta para crear el pedido
      carrito,
      { headers: this.getAuthHeaders() }
    );
  }

}


