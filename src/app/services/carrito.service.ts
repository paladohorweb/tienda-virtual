import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { Carrito } from '../models/carrito.model';
import { environment } from '../../environments/environment';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class CarritoService {
  private apiUrl = `${environment.apiUrl}/api/carrito`;

  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) {}

  private getAuthHeaders(): HttpHeaders {
    const token = this.authService.getToken();
    if (!token) throw new Error('No se encontró token');
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });
  }

  obtenerCarrito(): Observable<Carrito> {
    const usuarioId = this.authService.getUsuarioId();
    if (!usuarioId) return throwError(() => new Error('Usuario no autenticado'));

    return this.http.get<Carrito>(`${this.apiUrl}/${usuarioId}`, {
      headers: this.getAuthHeaders()
    }).pipe(
      tap(data => console.log('Carrito cargado:', data)),
      catchError(this.handleError)
    );
  }

  agregarProducto(productoId: number, cantidad: number): Observable<Carrito> {
    const usuarioId = this.authService.getUsuarioId();
    if (!usuarioId) return throwError(() => new Error('Usuario no autenticado'));

    return this.http.post<Carrito>(
      `${this.apiUrl}/agregar`,
      { usuarioId, productoId, cantidad },
      { headers: this.getAuthHeaders() }
    ).pipe(
      tap(data => console.log('Producto agregado:', data)),
      catchError(this.handleError)
    );
  }

  eliminarProducto(productoId: number): Observable<Carrito> {
    const usuarioId = this.authService.getUsuarioId();
    if (!usuarioId) return throwError(() => new Error('Usuario no autenticado'));

    return this.http.delete<Carrito>(
      `${this.apiUrl}/eliminar/${usuarioId}/${productoId}`,
      { headers: this.getAuthHeaders() }
    ).pipe(
      tap(data => console.log('Producto eliminado:', data)),
      catchError(this.handleError)
    );
  }

  vaciarCarrito(): Observable<void> {
    const usuarioId = this.authService.getUsuarioId();
    if (!usuarioId) return throwError(() => new Error('Usuario no autenticado'));

    return this.http.delete<void>(
      `${this.apiUrl}/vaciar/${usuarioId}`,
      { headers: this.getAuthHeaders() }
    ).pipe(
      tap(() => console.log('Carrito vaciado')),
      catchError(this.handleError)
    );
  }

  private handleError(error: any): Observable<never> {
    console.error('Error en CarritoService:', error);
    return throwError(() => new Error(error.message || 'Error desconocido'));
  }


  obtenerCantidadTotal(): Observable<number> {
  const usuarioId = this.authService.getUsuarioId();
  if (!usuarioId) return throwError(() => new Error('Usuario no autenticado'));

  return this.http.get<number>(
    `${this.apiUrl}/cantidad/${usuarioId}`,
    { headers: this.getAuthHeaders() }
  ).pipe(
    tap(data => console.log('Cantidad total en carrito:', data)),
    catchError(this.handleError)
  );
}
}
