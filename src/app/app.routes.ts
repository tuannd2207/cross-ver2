import { Routes } from '@angular/router';
import { AppLayoutComponent } from '@app/layout.component';
import { NotfoundComponent } from './features/notfound/notfound.component';
import { ErrorComponent } from './features/auth/error/error.component';
import { ngxPermissionsGuard } from 'ngx-permissions';
import { MenuPermissionsEnum } from '@helper/iLdap-login-res';

export const routes: Routes = [
  {
    path: '',
    component: AppLayoutComponent,
    children: [
      {
        path: 'system-management',
        loadChildren: () =>
          import('./features/system-management/system-management.routes'),
      },
      {
        path: 'operations',
        canActivate: [ngxPermissionsGuard],
        data: {
          permissions: {
            only: MenuPermissionsEnum.OPERATIONS,
            redirectTo: '/forbidden',
          },
        },
        loadChildren: () => import('./features/operations/operations.routes'),
      },
    ],
  },
  {
    path: 'auth',
    loadChildren: () =>
      import('./features/auth/auth.routes').then((m) => m.routes),
  },
  { path: 'notfound', component: NotfoundComponent },
  { path: 'error', component: ErrorComponent },
  { path: '**', redirectTo: '/notfound' },
];
