import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  private apiUrl = `${environment.apiUrl}/admin`;

  constructor(private http: HttpClient) {}

  getTotalProductos(): Observable<number> {
    return this.http.get<number>(`${this.apiUrl}/productos/count`);
  }

  getTotalUsuarios(): Observable<number> {
    return this.http.get<number>(`${this.apiUrl}/usuarios/count`);
  }

  getTotalPedidos(): Observable<number> {
    return this.http.get<number>(`${this.apiUrl}/pedidos/count`);
  }
}
