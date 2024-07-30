import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth/auth.service';
import { inject } from '@angular/core';

export const roleGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  const expectedRoles = route.data['roles'] as string[];
  const userRole = authService.getUserRole();

  if (!userRole || !expectedRoles.includes(userRole)) {
    router.navigate(['']);
    return false;
  }

  return true;
};
