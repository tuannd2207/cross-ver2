import { Component, ElementRef, OnInit } from '@angular/core';
import { NgForOf, NgIf } from '@angular/common';
import { AppMenuitemComponent } from '@app/app-menuItem/app.menuitem.component';
import { IMenuItem } from '@app/models/sidebar.model';

@Component({
  selector: 'ase-sidebar',
  standalone: true,
  imports: [NgIf, AppMenuitemComponent, NgForOf],
  templateUrl: './app.sidebar.component.html',
})
export class AppSidebarComponent implements OnInit {
  constructor(public el: ElementRef) {}
  model: IMenuItem[] = [];

  ngOnInit() {
    this.model = [
      {
        items: [
          {
            label: 'Quản trị hệ thống',
            icon: 'system',
            permissions: {
              INTERNAL: [],
              PARTNER: [],
            },
            items: [
              {
                label: 'Tham số hệ thống',
                routerLink: ['/system-management/parameters'],
              },
              {
                label: 'Quản lý người dùng',
                routerLink: ['/system-management/users'],
              },
              {
                label: 'Phân quyền chức năng',
                routerLink: ['/system-management/permission'],
              },
            ],
          },
        ],
      },
    ];
  }
}
