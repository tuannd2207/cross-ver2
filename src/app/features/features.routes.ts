import { Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'parameters',
    loadComponent: () =>
      import('./system-parameters/system-parameters.component').then(
        (c) => c.SystemParametersComponent
      ),
  },
  {
    path: 'users',
    loadComponent: () =>
      import('./users-management/users-management.component').then(
        (c) => c.UsersManagementComponent
      ),
  },
  {
    path: 'permission',
    loadComponent: () =>
      import('./permission-management/permission-management.component').then(
        (c) => c.PermissionManagementComponent
      ),
  },
  { path: '**', redirectTo: '/notfound' },
];

export default routes;
