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
  private apiUrl = `${environment.apiUrl}/carrito`;

  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) {}

  private getAuthHeaders(): HttpHeaders {
    const token = this.authService.getToken();
    if (!token) {
      console.error('No se encontró token de autenticación');
      throw new Error('Sesión no válida');
    }
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });
  }

  obtenerCarrito(): Observable<Carrito> {
    try {
      const usuarioId = this.authService.getUsuarioId();
      if (!usuarioId) {
        throw new Error('Usuario no autenticado');
      }

      return this.http.get<Carrito>(`${this.apiUrl}/${usuarioId}`, {
        headers: this.getAuthHeaders()
      }).pipe(
        tap(carrito => console.log('Carrito obtenido:', carrito)),
        catchError(this.handleError)
      );
    } catch (error) {
      return throwError(() => error);
    }
  }

  agregarProducto(productoId: number, cantidad: number): Observable<Carrito> {
    try {
      const usuarioId = this.authService.getUsuarioId();
      if (!usuarioId) {
        throw new Error('Usuario no autenticado');
      }

      return this.http.post<Carrito>(
        `${this.apiUrl}/agregar`,
        { usuarioId, productoId, cantidad },
        { headers: this.getAuthHeaders() }
      ).pipe(
        tap(carrito => console.log('Producto agregado:', carrito)),
        catchError(this.handleError)
      );
    } catch (error) {
      return throwError(() => error);
    }
  }

  eliminarProducto(productoId: number): Observable<Carrito> {
    try {
      const usuarioId = this.authService.getUsuarioId();
      if (!usuarioId) {
        throw new Error('Usuario no autenticado');
      }

      return this.http.delete<Carrito>(
        `${this.apiUrl}/eliminar/${usuarioId}/${productoId}`,
        { headers: this.getAuthHeaders() }
      ).pipe(
        tap(carrito => console.log('Producto eliminado:', carrito)),
        catchError(this.handleError)
      );
    } catch (error) {
      return throwError(() => error);
    }
  }

  vaciarCarrito(): Observable<void> {
    try {
      const usuarioId = this.authService.getUsuarioId();
      if (!usuarioId) {
        throw new Error('Usuario no autenticado');
      }

      return this.http.delete<void>(
        `${this.apiUrl}/vaciar/${usuarioId}`,
        { headers: this.getAuthHeaders() }
      ).pipe(
        tap(() => console.log('Carrito vaciado')),
        catchError(this.handleError)
      );
    } catch (error) {
      return throwError(() => error);
    }
  }

  limpiarCarrito(): Observable<void> {
    return this.vaciarCarrito();
  }

  private handleError(error: any): Observable<never> {
    console.error('Error en CarritoService:', error);
    const errorMsg = error.error?.message || error.message || 'Error desconocido';
    return throwError(() => new Error(errorMsg));
  }
}

