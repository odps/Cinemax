import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const loggedinGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  // Verifica si el usuario tiene un token válido antes de permitir el acceso
  if (authService['hasValidToken']()) {
    return true;
  }
  router.navigate(['/landing']);
  return false;
};
