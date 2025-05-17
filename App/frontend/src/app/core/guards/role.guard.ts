import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const roleGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  // Obtenemos los roles esperados desde la ruta
  const expectedRoles = route.data['role'];

  let hasAccess = false;
  // Verificamos si el usuario tiene al menos uno de los roles requeridos
  if (Array.isArray(expectedRoles)) {
    hasAccess = expectedRoles.some((role: string) => authService.hasRole(role));
  } else {
    hasAccess = authService.hasRole(expectedRoles);
  }

  if (hasAccess) {
    return true;
  }
  router.navigate(['/error']);
  return false;
};
