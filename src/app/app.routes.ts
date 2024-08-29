import { Routes } from '@angular/router';
import { AppLayoutComponent } from '@app/layout.component';
import { authGuard } from '@helper/auth.guard';
import { NotfoundComponent } from './features/notfound/notfound.component';
import { ErrorComponent } from './features/auth/error/error.component';

export const routes: Routes = [
  {
    path: '',
    component: AppLayoutComponent,
    children: [
      {
        path: 'system-management',
        canActivate: [authGuard],
        loadChildren: () => import('./features/features.routes'),
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
