import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'http://localhost:8080/api/auth/login'; // 🔹 Ajusta si es necesario
  private authTokenKey = 'authToken';
  private userRoleKey = 'userRole';

  private isLoggedInSubject = new BehaviorSubject<boolean>(this.hasToken());

  constructor(private http: HttpClient) {
    if (this.getToken()) {
      this.isLoggedInSubject.next(true);
    }
  }

  /** 🔹 Iniciar sesión */
  login(credentials: { email: string; password: string }): Observable<any> {
    return this.http.post(this.apiUrl, credentials).pipe(
      tap((response: any) => {
        console.log('Respuesta del backend:', response);
        if (response.token) {
          localStorage.setItem(this.authTokenKey, response.token);
          localStorage.setItem(this.userRoleKey, response.role || 'USER'); // Guarda el rol si existe
          this.isLoggedInSubject.next(true);
        }
      })
    );
  }

  /** 🔹 Cerrar sesión */
  logout() {
    localStorage.removeItem(this.authTokenKey);
    localStorage.removeItem(this.userRoleKey);
    this.isLoggedInSubject.next(false);
  }

  /** 🔹 Obtener token almacenado */
  getToken(): string | null {
    return localStorage.getItem(this.authTokenKey);
  }

  /** 🔹 Saber si el usuario está autenticado */
  isAuthenticated(): boolean {
    return this.isLoggedInSubject.value;
  }

  /** 🔹 Obtener el rol del usuario */
  getUserRole(): string | null {
    return localStorage.getItem(this.userRoleKey);
  }

  /** 🔹 Observable para detectar cambios en autenticación */
  getAuthStatus(): Observable<boolean> {
    return this.isLoggedInSubject.asObservable();
  }

  /** 🔹 Comprobar si hay un token en localStorage */
  private hasToken(): boolean {
    return !!this.getToken();
  }
}






