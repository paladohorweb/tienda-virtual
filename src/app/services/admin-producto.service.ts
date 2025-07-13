import { Injectable } from "@angular/core";
import { environment } from "../../environments/environment";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { AuthService } from "./auth.service";
import { Observable } from "rxjs";
import { Producto } from "../models/producto.model";

@Injectable({ providedIn: 'root' })
export class AdminProductoService {


  private url = `${environment.apiUrl}/admin/productos`;
  constructor(private http: HttpClient) {}

  listar(): Observable<Producto[]> {
    return this.http.get<Producto[]>(this.url);
  }

  crear(prod: Producto): Observable<Producto> {
    return this.http.post<Producto>(this.url, prod);
  }

  actualizar(prod: Producto): Observable<Producto> {
    return this.http.put<Producto>(`${this.url}/${prod.id}`, prod);
  }

  eliminar(id: number): Observable<void> {
    return this.http.delete<void>(`${this.url}/${id}`);
  }
}
