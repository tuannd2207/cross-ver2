import { Routes } from '@angular/router';
import { MenuPermissionsEnum } from '@helper/iLdap-login-res';

const routes: Routes = [
  {
    path: 'transactions',
    data: {
      permissions: {
        only: MenuPermissionsEnum.TRANSACTION_LIST,
        redirectTo: '/forbidden',
      },
    },
    loadComponent: () =>
      import('./transactions/transaction.component').then(
        (c) => c.TransactionComponent
      ),
  },
  {
    path: 'policies',
    data: {
      permissions: {
        only: MenuPermissionsEnum.POLICY_OPEN,
        redirectTo: '/forbidden',
      },
    },
    loadComponent: () =>
      import('./policies/policies.component').then((c) => c.PoliciesComponent),
  },
  {
    path: 'general-information',
    data: {
      permissions: {
        only: MenuPermissionsEnum.PARTNER_OPEN,
        redirectTo: '/forbidden',
      },
    },
    loadComponent: () =>
      import('./general-information/general-information.component').then(
        (c) => c.GeneralInformationComponent
      ),
  },
  { path: '**', redirectTo: '/notfound' },
];

export default routes;
