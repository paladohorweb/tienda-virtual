import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const adminGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  const usuario = authService.getUsuario();

  if (authService.isAuthenticated() && usuario?.rol?.includes('ROLE_ADMIN')) {
    return true;
  }

  alert('❌ Acceso denegado: solo para administradores.');
  router.navigate(['/']);
  return false;
};
