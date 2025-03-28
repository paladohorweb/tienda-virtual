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

  obtenerCarrito(): Observable<any> {
    const token = localStorage.getItem('token'); // 🔹 Obtener token del localStorage
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}` // 🔹 Enviar token en la petición
    });

    return this.http.get<any>(this.apiUrl, { headers });
  }

  agregarProducto(productoId: number, cantidad: number): Observable<Carrito> {
    return this.http.post<Carrito>(`${this.apiUrl}/agregar`, { productoId, cantidad });
  }

  eliminarProducto(productoId: number): Observable<Carrito> {
    return this.http.delete<Carrito>(`${this.apiUrl}/eliminar/${productoId}`);
  }

  vaciarCarrito(): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/vaciar`);
  }
}
