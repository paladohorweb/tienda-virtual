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

  constructor(private http: HttpClient, private authService: AuthService) {}

  /** 🔹 Obtener token de autenticación */
  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('authToken');  // 📌 Asegurar que toma el token de localStorage
    if (!token) {
      console.error('❌ No se encontró el token en localStorage');
      return new HttpHeaders();
    }
    console.log('🔑 Token enviado en headers:', token);

    return new HttpHeaders({
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    });
  }

  /** 🔹 Obtener el carrito del usuario autenticado */
  obtenerCarrito(): Observable<Carrito> {
    const usuarioId = this.obtenerUsuarioId();
    if (!usuarioId) {
      console.error('❌ No se encontró usuarioId en sessionStorage');
      return throwError(() => new Error('Usuario no autenticado'));
    }

    const url = `${this.apiUrl}/${usuarioId}`;  // 📌 Agregamos el usuarioId
    console.log('📡 Enviando solicitud a:', url);

    return this.http.get<Carrito>(url, { headers: this.getAuthHeaders() }).pipe(
      tap(carrito => console.log('✅ Carrito obtenido:', carrito)),
      catchError(err => {
        console.error('❌ Error al obtener el carrito:', err);
        return throwError(() => new Error('Error al obtener el carrito'));
      })
    );
  }

  /** 🔹 Agregar un producto al carrito */
  agregarProducto(productoId: number, cantidad: number): Observable<Carrito> {
    const headers = this.getAuthHeaders();
    const usuarioId = this.obtenerUsuarioId();

    if (!usuarioId) {
      console.error('❌ Usuario no autenticado');
      return throwError(() => new Error('Usuario no autenticado'));
    }

    const body = { usuarioId, productoId, cantidad };

    return this.http.post<Carrito>(`${this.apiUrl}/agregar`, body, { headers }).pipe(
      tap(carrito => console.log('✅ Producto agregado, nuevo carrito:', carrito)),
      catchError(err => {
        console.error('❌ Error al agregar producto:', err);
        return throwError(() => new Error('Error al agregar producto'));
      })
    );
  }

  /** 🔹 Obtener el ID del usuario autenticado */
  private obtenerUsuarioId(): number | null {
    const usuarioId = sessionStorage.getItem('usuarioId');
    return usuarioId ? Number(usuarioId) : null;
  }

  /** 🔹 Eliminar un producto específico del carrito */
  eliminarProducto(productoId: number): Observable<Carrito> {
    const usuarioId = this.obtenerUsuarioId();
    if (!usuarioId) {
      console.error('❌ No se encontró usuarioId en sessionStorage');
      return throwError(() => new Error('Usuario no autenticado'));
    }

    const url = `${this.apiUrl}/eliminar/${usuarioId}/${productoId}`;  // 📌 Se agrega usuarioId a la URL
    console.log('📡 Enviando solicitud a:', url);

    return this.http.delete<Carrito>(url, { headers: this.getAuthHeaders() }).pipe(
      tap(carrito => console.log('✅ Producto eliminado, nuevo carrito:', carrito)),
      catchError(err => {
        console.error('❌ Error al eliminar producto:', err);
        return throwError(() => new Error('Error al eliminar producto'));
      })
    );
  }

  /** 🔹 Vaciar el carrito completamente */
  vaciarCarrito(): Observable<void> {
    const usuarioId = this.obtenerUsuarioId();
    if (!usuarioId) {
      console.error('❌ No se encontró usuarioId en sessionStorage');
      return throwError(() => new Error('Usuario no autenticado'));
    }

    const url = `${this.apiUrl}/vaciar/${usuarioId}`;  // 📌 Se agrega usuarioId a la URL
    console.log('📡 Enviando solicitud a:', url);

    return this.http.delete<void>(url, { headers: this.getAuthHeaders() }).pipe(
      tap(() => console.log('✅ Carrito vaciado')),
      catchError(err => {
        console.error('❌ Error al vaciar el carrito:', err);
        return throwError(() => new Error('Error al vaciar el carrito'));
      })
    );
  }
}

