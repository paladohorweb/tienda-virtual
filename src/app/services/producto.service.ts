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
}

