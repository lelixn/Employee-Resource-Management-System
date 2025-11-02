import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const RoleGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const expectedRole = route.data?.['role'];
  const currentRole = localStorage.getItem('role');

  if (!currentRole || currentRole !== expectedRole) {
    router.navigate(['/login']);
    return false;
  }

  return true;
};
