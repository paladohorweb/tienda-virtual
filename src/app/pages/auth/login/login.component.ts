import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  imports: [CommonModule, FormsModule],
})
export class LoginComponent {
  credentials = { email: '', password: '' };
  errorMessage = '';

  constructor(private authService: AuthService, private router: Router, activateRoute:ActivatedRoute) {}

  onSubmit() {
    if (!this.credentials.email || !this.credentials.password) {
      this.errorMessage = 'El email y la contraseña son obligatorios';
      return;
    }

    this.authService.login(this.credentials).subscribe({
      next: (response) => {
        console.log('✅ Login exitoso.');
        console.log('Token:', sessionStorage.getItem('authToken'));
        console.log('Usuario ID:', sessionStorage.getItem('usuarioId'));

        const usuario = response.usuario;
    if (usuario.rol === 'ROLE_ADMIN') {
      this.router.navigate(['/admin/productos']); // o dashboard admin si prefieres
    } else {
      this.router.navigate(['/']); // Página home u otra
    }


       // this.router.navigate(['/']).then(() => {
          //window.location.reload(); // 🔄 Recargar la página para actualizar estado
        //});
      },
      error: (err) => {
        console.error('❌ Error al iniciar sesión', err);
        this.errorMessage = 'Credenciales incorrectas';
      },
    });
  }
}

