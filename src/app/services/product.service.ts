import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../models/product.model';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators'; // 🔹 Importar map

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private apiUrl = 'http://localhost:8080/api/productos'; // URL del backend

  constructor(private http: HttpClient) {}

  /** Obtiene todos los productos del backend y los adapta a la interfaz Product */
  getProducts(): Observable<Product[]> {
    return this.http.get<any[]>(this.apiUrl).pipe(
      map(productos => productos.map(prod => ({
        id: prod.id,
        name: prod.nombre, // 🔹 Mapeamos nombre → name
        description: prod.descripcion,
        price: prod.precio, // 🔹 Mapeamos precio → price
        image: prod.imagenUrl // 🔹 Mapeamos imagenUrl → image
      })))
    );
  }
}
