import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Carrito } from '../models/carrito.model';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CarritoService {
  private apiUrl = `${environment.apiUrl}/carrito`;

  constructor(private http: HttpClient) {}

  /** 🔹 Obtener token desde sessionStorage */
  private getAuthHeaders(): HttpHeaders {
    const token = sessionStorage.getItem('authToken'); // 🔹 Aseguramos que es el mismo storage que en AuthService
    return new HttpHeaders({
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json', // 🔹 Asegurar formato correcto
    });
  }

  /** 🔹 Obtener el carrito del usuario autenticado */
  obtenerCarrito(): Observable<Carrito> {
    return this.http.get<Carrito>(`${this.apiUrl}`, { headers: this.getAuthHeaders() });
  }

  /** 🔹 Agregar un producto al carrito */
  agregarProducto(productoId: number, cantidad: number): Observable<any> {
    const headers = this.getAuthHeaders(); // ✅ Obtener el token correctamente
    const body = { usuarioId: this.obtenerUsuarioId(), productoId, cantidad }; // ✅ Incluir usuarioId

    return this.http.post(`${this.apiUrl}/agregar`, body, { headers });
  }

  /** 🔹 Método para obtener el ID del usuario autenticado */
  private obtenerUsuarioId(): number {
    return Number(sessionStorage.getItem('usuarioId')); // Asegurar que el usuario tiene ID almacenado
  }

  /** 🔹 Eliminar un producto específico del carrito */
  eliminarProducto(productoId: number): Observable<Carrito> {
    return this.http.delete<Carrito>(`${this.apiUrl}/eliminar/${productoId}`, {
      headers: this.getAuthHeaders(),
    });
  }

  /** 🔹 Vaciar el carrito completamente */
  vaciarCarrito(): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/vaciar`, { headers: this.getAuthHeaders() });
  }
}
