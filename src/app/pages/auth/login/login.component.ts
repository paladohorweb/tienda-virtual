import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  imports: [CommonModule,  FormsModule ]
})
export class LoginComponent {
  credentials = { email: '', password: '' };
  errorMessage = '';

  constructor(private authService: AuthService, private router: Router) {}

  onSubmit() {
    if (!this.credentials.email || !this.credentials.password) {
      this.errorMessage = 'El email y la contraseña son obligatorios';
      return;
    }

    this.authService.login(this.credentials).subscribe({
      next: () => this.router.navigate(['/']),
      error: (err) => {
        console.error('Error al iniciar sesión', err);
        this.errorMessage = 'Credenciales incorrectas';
      },
    });
  }
}
