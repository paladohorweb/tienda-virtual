import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'http://localhost:8080/api/auth/login'; // ✅ Ajusta si es necesario
  private authTokenKey = 'authToken';

  private isLoggedInSubject = new BehaviorSubject<boolean>(this.hasToken());

  constructor(private http: HttpClient) {}

  /** 🔹 Iniciar sesión */
  login(credentials: { email: string; password: string }): Observable<any> {
    return this.http.post(this.apiUrl, credentials).pipe(
      tap((response: any) => {
        console.log('Token recibido:', response.token);
        sessionStorage.setItem(this.authTokenKey, response.token);
        this.isLoggedInSubject.next(true);
      })
    );
  }
  /** 🔹 Cerrar sesión */
  logout() {
    localStorage.removeItem(this.authTokenKey);
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

  /** 🔹 Observable para detectar cambios en autenticación */
  getAuthStatus(): Observable<boolean> {
    return this.isLoggedInSubject.asObservable();
  }

  /** 🔹 Comprobar si hay un token en localStorage */
  private hasToken(): boolean {
    return !!this.getToken();
  }
}

