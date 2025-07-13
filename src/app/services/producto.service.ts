import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Producto } from '../models/producto.model';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {
  [x: string]: any;
  private apiUrl = `${environment.apiUrl}/productos`;  // 🔹 Asegúrate de que la URL es correcta

  constructor(private http: HttpClient) {}


  //
  obtenerProductos(): Observable<Producto[]> {
    return this.http.get<Producto[]>(this.apiUrl).pipe(
      map((productos: any[]) =>
        productos.map((p: any) => ({
          id: p.id,
          nombre: p.nombre,          // 🔹 Asegúrate de que coincide con el backend
          descripcion: p.descripcion,
          precio: p.precio,
          stock: p.stock ?? 0,       // 🔹 Evita undefined en stock
          imagen: p.imagen,          // 🔹 Usa el nombre correcto
        }))
      )
    );
  }


  obtenerProductosDestacados(): Observable<Producto[]> {
  return this.http.get<Producto[]>(`${this.apiUrl}/destacados`).pipe(
    map((productos: any[]) =>
      productos.map((p: any) => ({
        id: p.id,
        nombre: p.nombre,
        descripcion: p.descripcion,
        precio: p.precio,
        stock: p.stock ?? 0,
        imagen: p.imagen
          ? `assets/img/${p.imagen}`
          : 'assets/img/default.jpg' // ✅ Ruta local de imagen si no hay
      }))
    )
  );
}


crearProducto(producto: Producto): Observable<Producto> {
  return this.http.post<Producto>(this.apiUrl, producto);
}

actualizarProducto(id: number, producto: Producto): Observable<Producto> {
  return this.http.put<Producto>(`${this.apiUrl}/${producto.id}`, producto);
}

eliminarProducto(id: number): Observable<void> {
  return this.http.delete<void>(`${this.apiUrl}/${id}`);
}
}

