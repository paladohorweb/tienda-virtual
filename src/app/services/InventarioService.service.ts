// src/app/services/inventario.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { AuthService } from './auth.service';
import { MovimientoInventarioRequest, MovimientoInventarioResponse } from '../models/movimiento-iventario.models';

@Injectable({
  providedIn: 'root'
})
export class InventarioService {
  private baseUrl = `${environment.apiUrl}/api/inventario`;
  private movimientos$ = new BehaviorSubject<MovimientoInventarioResponse[]>([]);
  movimientosObservable$ = this.movimientos$.asObservable();

  constructor(private http: HttpClient, private authService: AuthService) {}

  private headers() {
    const token = this.authService.getToken();
    let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    if (token) headers = headers.set('Authorization', `Bearer ${token}`);
    return { headers };
  }

  registrarMovimiento(req: MovimientoInventarioRequest): Observable<MovimientoInventarioResponse> {
    return this.http.post<MovimientoInventarioResponse>(`${this.baseUrl}/movimiento`, req, this.headers()).pipe(
      tap(resp => {
        // actualizar caché local
        const current = this.movimientos$.value;
        this.movimientos$.next([resp, ...current]);
      })
    );
  }

  listarMovimientos(): Observable<MovimientoInventarioResponse[]> {
    return this.http.get<MovimientoInventarioResponse[]>(`${this.baseUrl}/movimientos`, this.headers()).pipe(
      tap(list => this.movimientos$.next(list))
    );
  }

  listarPorProducto(productoId: number): Observable<MovimientoInventarioResponse[]> {
    return this.http.get<MovimientoInventarioResponse[]>(`${this.baseUrl}/producto/${productoId}`, this.headers());
  }

  bajoStock(threshold = 5) {
    return this.http.get<any[]>(`${this.baseUrl}/bajo-stock?threshold=${threshold}`, this.headers());
  }
}
