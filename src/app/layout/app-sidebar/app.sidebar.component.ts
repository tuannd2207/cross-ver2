import { Component, ElementRef, OnInit } from '@angular/core';
import { NgForOf, NgIf } from '@angular/common';
import { AppMenuitemComponent } from '@app/app-menuItem/app.menuitem.component';
import { IMenuItem } from '@app/models/sidebar.model';
import TRANSLATION_PATH from '@app/translation-paths.enum';
import { MenuPermissionsEnum } from '@helper/iLdap-login-res';
import { NgxPermissionsModule } from 'ngx-permissions';

@Component({
  selector: 'ase-sidebar',
  standalone: true,
  imports: [NgIf, AppMenuitemComponent, NgForOf, NgxPermissionsModule],
  templateUrl: './app.sidebar.component.html',
})
export class AppSidebarComponent implements OnInit {
  constructor(public el: ElementRef) {}
  model: IMenuItem[] = [];

  ngOnInit() {
    this.model = [
      {
        permissions: [],
        items: [
          {
            label: TRANSLATION_PATH.COMMON + 'SYSTEM_MANAGEMENT',
            icon: 'system',
            items: [
              {
                label: TRANSLATION_PATH.SYSTEM_PARAMETERS + 'TITLE',
                routerLink: ['/system-management/parameters'],
                permissions: [MenuPermissionsEnum.SYS_PARAM_OPEN],
              },
              {
                label: TRANSLATION_PATH.USERS_MANAGEMENT + 'TITLE',
                routerLink: ['/system-management/users'],
              },
              {
                label: TRANSLATION_PATH.PERMISSIONS_MANAGEMENT + 'TITLE',
                routerLink: ['/system-management/permissions'],
                permissions: [MenuPermissionsEnum.PERMISSIONS_OPEN],
              },
            ],
          },
          {
            label: TRANSLATION_PATH.COMMON + 'OPERATIONS',
            icon: 'operations',
            permissions: [MenuPermissionsEnum.OPERATIONS],
            items: [
              {
                label: TRANSLATION_PATH.GENERAL_INFORMATION + 'TITLE',
                routerLink: ['/operations/general-information'],
                permissions: [MenuPermissionsEnum.PARTNER_OPEN],
              },
              {
                label: TRANSLATION_PATH.POLICIES + 'TITLE',
                routerLink: ['/operations/policies'],
                permissions: [MenuPermissionsEnum.POLICY_OPEN],
              },
              {
                label: TRANSLATION_PATH.TRANSACTIONS + 'TITLE',
                routerLink: ['/operations/transactions'],
                permissions: [MenuPermissionsEnum.TRANSACTION_LIST],
              },
            ],
          },
        ],
      },
    ];
  }

  protected readonly MenuPermissionsEnum = MenuPermissionsEnum;
}
