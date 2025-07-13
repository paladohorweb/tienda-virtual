import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './register.component.html'

})
export class RegisterComponent {
  nombre = '';
  email = '';
  password = '';
  errorMessage = '';
  successMessage = '';

  constructor(private authService: AuthService, private router: Router) {}

 onSubmit() {
  this.errorMessage = '';
  this.successMessage = '';

  if (!this.nombre || !this.email || !this.password) {
    this.errorMessage = 'Todos los campos son obligatorios';
    return;
  }

  const nuevoUsuario = {
    nombre: this.nombre,
    email: this.email,
    password: this.password
  };

  this.authService.register(nuevoUsuario).subscribe({
    next: () => {
      this.successMessage = 'Registro exitoso. Ya puedes iniciar sesión.';
      setTimeout(() => this.router.navigate(['/login']), 2000);
    },
    error: (err) => {
      console.error('❌ Error al registrar:', err);
      this.errorMessage = err.error?.error || 'Error al registrar usuario';
    }
  });
}
}
