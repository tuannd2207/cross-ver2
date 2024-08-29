import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'error',
    loadComponent: () =>
      import('./error/error.component').then((c) => c.ErrorComponent),
  },
  {
    path: 'access',
    loadComponent: () =>
      import('./access/access.component').then((c) => c.AccessComponent),
  },
  {
    path: 'login',
    loadComponent: () =>
      import('./login/login.component').then((c) => c.LoginComponent),
  },
  { path: '**', redirectTo: '/notfound' },
];
