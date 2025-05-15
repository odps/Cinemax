import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const roleGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  const expectedRoles = route.data['role'];

  let hasAccess = false;
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
