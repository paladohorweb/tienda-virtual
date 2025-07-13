import { Injectable } from "@angular/core";
import { environment } from "../../environments/environment";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { AuthService } from "./auth.service";
import { Observable } from "rxjs";
import { Producto } from "../models/producto.model";

@Injectable({ providedIn: 'root' })
export class AdminProductoService {
  private url = `${environment.apiUrl}/admin/productos`;
  constructor(private http: HttpClient, private auth: AuthService) {}

  private headers() {
    return { headers: new HttpHeaders({ 'Authorization': `Bearer ${this.auth.getToken()}` }) };
  }

  listar(): Observable<Producto[]> {
    return this.http.get<Producto[]>(this.url, this.headers());
  }
  crear(prod: Producto): Observable<Producto> {
    return this.http.post<Producto>(this.url, prod, this.headers());
  }
  actualizar(prod: Producto): Observable<Producto> {
    return this.http.put<Producto>(`${this.url}/${prod.id}`, prod, this.headers());
  }
  eliminar(id: number): Observable<void> {
    return this.http.delete<void>(`${this.url}/${id}`, this.headers());
  }
}
