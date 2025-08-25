import { Injectable} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Venta } from '../models/venta.model';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class VentaService {

   private apiUrl = `${environment.apiUrl}/api/ventas`;


   constructor(private http: HttpClient) {}
   registrarVenta(pedidoId: number, facturaId: number, pagoId: number, usuarioId: number): Observable<Venta> {
    return this.http.post<Venta>(`${this.apiUrl}/registrar`, null, {
      params: {
        pedidoId,
        facturaId,
        pagoId,
        usuarioId
      }
    });
  }

  listarPorUsuario(usuarioId: number): Observable<Venta[]> {
    return this.http.get<Venta[]>(`${this.apiUrl}/usuario/${usuarioId}`);
  }

  listarTodas(): Observable<Venta[]> {
    return this.http.get<Venta[]>(`${this.apiUrl}/admin`);
  }
}
