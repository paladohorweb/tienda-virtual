import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = `${environment.apiUrl}/api/auth`;
  private authTokenKey = 'authToken';
  private usuarioIdKey = 'usuarioId';

  private isLoggedInSubject = new BehaviorSubject<boolean>(this.hasToken());

  constructor(private http: HttpClient) {}

  /** 🔹 Iniciar sesión */
  login(credentials: { email: string; password: string }): Observable<{ token: string; usuarioId: number; usuario: any }> {
    return this.http.post<{ token: string; usuarioId: number; usuario: any }>(
      `${this.apiUrl}/login`,
      credentials
    ).pipe(
      tap((response) => {
        sessionStorage.setItem(this.authTokenKey, response.token);
        sessionStorage.setItem(this.usuarioIdKey, response.usuarioId.toString());
        sessionStorage.setItem('usuario', JSON.stringify(response.usuario)); // ✅ Guardar usuario completo en sessionStorage

        this.isLoggedInSubject.next(true);
        console.log('✅ Login exitoso. Token, usuarioId y usuario guardados:', response);
      })
    );
  }


  /** 🔹 Registrar nuevo usuario */
register(data: { nombre: string; email: string; password: string }): Observable<any> {
  return this.http.post(`${this.apiUrl}/register`, data);
}




  /** 🔹 Cerrar sesión */
  logout() {
    sessionStorage.removeItem(this.authTokenKey);
    sessionStorage.removeItem(this.usuarioIdKey);
     sessionStorage.removeItem('usuario');
    this.isLoggedInSubject.next(false);
    console.log('🚪 Usuario cerró sesión.');
  }

  /** 🔹 Obtener token almacenado */
  getToken(): string | null {
    return sessionStorage.getItem(this.authTokenKey);
  }

  /** 🔹 Obtener ID del usuario autenticado */
  getUsuarioId(): number | null {
    const id = sessionStorage.getItem(this.usuarioIdKey);
    return id ? Number(id) : null;
  }

  /** 🔹 Saber si el usuario está autenticado */
  isAuthenticated(): boolean {
    return this.isLoggedInSubject.value;
  }

  /** 🔹 Observable para cambios en autenticación */
  getAuthStatus(): Observable<boolean> {
    return this.isLoggedInSubject.asObservable();
  }

  /** 🔹 Comprobar si hay un token en sessionStorage */
  private hasToken(): boolean {
    return !!this.getToken();
  }

  getUsuario(): any {
    const usuarioJson = sessionStorage.getItem('usuario');
    return usuarioJson ? JSON.parse(usuarioJson) : null;
  }
}






