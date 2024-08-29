import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { LocalStorageJwtService } from '@helper/local-storage-jwt.service';
import { map, take } from 'rxjs';

export const authGuard: CanActivateFn = () => {
  const storageJwtService = inject(LocalStorageJwtService);
  const router = inject(Router);
  return storageJwtService.getItem().pipe(
    map((token) => {
      if (!token) {
        return router.parseUrl('/auth/login');
      }
      return true;
    }),
    take(1)
  );
};
