import { Routes } from '@angular/router';
import { ngxPermissionsGuard } from 'ngx-permissions';
import { MenuPermissionsEnum } from '@helper/iLdap-login-res';

const routes: Routes = [
  {
    path: 'parameters',
    canActivate: [ngxPermissionsGuard],
    data: {
      permissions: {
        only: MenuPermissionsEnum.SYS_PARAM_OPEN,
        redirectTo: '/forbidden',
      },
    },
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
    path: 'permissions',
    canActivate: [ngxPermissionsGuard],
    data: {
      permissions: {
        only: MenuPermissionsEnum.PERMISSIONS_OPEN,
        redirectTo: '/forbidden',
      },
    },
    loadComponent: () =>
      import('./permissions-management/permissions-management.component').then(
        (c) => c.PermissionsManagementComponent
      ),
  },
  { path: '**', redirectTo: '/notfound' },
];

export default routes;
