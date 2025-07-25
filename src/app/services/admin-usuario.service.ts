import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { environment } from '../../environments/environment';

export interface UsuarioAdmin {
  id: number;
  nombre: string;
  email: string;
  rol: 'ROLE_USER' | 'ROLE_ADMIN';
}

@Injectable({ providedIn: 'root' })
export class AdminUsuarioService {
  private url = `${environment.apiUrl}/admin/usuarios`;

  constructor(private http: HttpClient, private auth: AuthService) {}

  private headers() {
    return {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${this.auth.getToken()}`
      })
    };
  }

  listar(): Observable<UsuarioAdmin[]> {
    return this.http.get<UsuarioAdmin[]>(this.url, this.headers());
  }

  actualizar(usuario: UsuarioAdmin): Observable<UsuarioAdmin> {
    return this.http.put<UsuarioAdmin>(`${this.url}/${usuario.id}`, usuario, this.headers());
  }

  eliminar(id: number): Observable<void> {
  return this.http.delete<void>(`${this.url}/${id}`, this.headers());
}
}
