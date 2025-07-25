import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { Credito } from '../models/credito.model';

@Injectable({ providedIn: 'root' })
export class CreditoService {

  private apiUrl = `${environment.apiUrl}/api/creditos`;

  constructor(private http: HttpClient) {}

  solicitarCredito(userId: number, dto: any): Observable<Credito> {
    return this.http.post<Credito>(`${this.apiUrl}/solicitar/${userId}`, dto);
  }

  listarPorUsuario(userId: number): Observable<Credito[]> {
    return this.http.get<Credito[]>(`${this.apiUrl}/usuario/${userId}`);
  }

  listarTodos(): Observable<Credito[]> {
    return this.http.get<Credito[]>(`${this.apiUrl}/admin`);
  }

  aprobarCredito(id: number): Observable<Credito> {
    return this.http.put<Credito>(`${this.apiUrl}/aprobar/${id}`, {});
  }

  rechazarCredito(id: number): Observable<Credito> {
    return this.http.put<Credito>(`${this.apiUrl}/rechazar/${id}`, {});
  }
}

