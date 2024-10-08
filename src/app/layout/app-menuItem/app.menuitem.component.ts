import {
  Component,
  DestroyRef,
  HostBinding,
  inject,
  Input,
  OnInit,
} from '@angular/core';
import {
  NavigationEnd,
  Router,
  RouterLink,
  RouterLinkActive,
} from '@angular/router';
import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { filter } from 'rxjs/operators';
import { MenuService } from '../service/app.menu.service';
import { CommonModule, NgClass, NgForOf, NgIf } from '@angular/common';
import { RippleModule } from 'primeng/ripple';
import { AseIconComponent } from '@share/ase-icon/ase-icon.component';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { TranslateModule } from '@ngx-translate/core';
import { NgxPermissionsModule } from 'ngx-permissions';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  standalone: true,
  imports: [
    NgIf,
    CommonModule,
    RouterLink,
    NgClass,
    RouterLinkActive,
    NgForOf,
    RippleModule,
    AseIconComponent,
    TranslateModule,
    NgxPermissionsModule,
  ],
  selector: 'ase-menuitem',
  template: `
    <ng-container>
      <div
        *ngIf="root && item.visible !== false"
        class="layout-menuitem-root-text">
        {{ item.label | translate }}
      </div>
      <ng-container *ngxPermissionsOnly="item.permissions">
        <a
          *ngIf="(!item.routerLink || item.items) && item.visible !== false"
          [attr.href]="item.url"
          (click)="itemClick($event)"
          [ngClass]="item.class"
          [attr.target]="item.target"
          tabindex="0"
          pRipple>
          <ase-icon [iconName]="item.icon" />
          <i [ngClass]="item.icon" class="layout-menuitem-icon"></i>
          <span
            class="layout-menuitem-text transition-all animation-duration-150">
            {{ item.label | translate }}
          </span>
          <i
            class="pi pi-fw pi-angle-down layout-submenu-toggler"
            *ngIf="item.items"></i>
        </a>
      </ng-container>
      <ng-container *ngxPermissionsOnly="item.permissions">
        <a
          *ngIf="item.routerLink && !item.items && item.visible !== false"
          (click)="itemClick($event)"
          [ngClass]="item.class"
          [routerLink]="item.routerLink"
          routerLinkActive="active-route"
          [routerLinkActiveOptions]="
            item.routerLinkActiveOptions || {
              paths: 'exact',
              queryParams: 'ignored',
              matrixParams: 'ignored',
              fragment: 'ignored',
            }
          "
          [fragment]="item.fragment"
          [queryParamsHandling]="item.queryParamsHandling"
          [preserveFragment]="item.preserveFragment"
          [skipLocationChange]="item.skipLocationChange"
          [replaceUrl]="item.replaceUrl"
          [state]="item.state"
          [queryParams]="item.queryParams"
          [attr.target]="item.target"
          tabindex="0"
          pRipple>
          <i [ngClass]="item.icon" class="layout-menuitem-icon"></i>
          <span
            class="layout-menuitem-text transition-all animation-duration-200">
            {{ item.label | translate }}
          </span>
          <i
            class="pi pi-fw pi-angle-down layout-submenu-toggler"
            *ngIf="item.items"></i>
        </a>
      </ng-container>
      <ul
        *ngIf="item.items && item.visible !== false"
        [@children]="submenuAnimation">
        <ng-template ngFor let-child let-i="index" [ngForOf]="item.items">
          <ase-menuitem
            *ngxPermissionsOnly="child.permissions"
            [item]="child"
            [index]="i"
            [parentKey]="key"></ase-menuitem>
        </ng-template>
      </ul>
    </ng-container>
  `,
  animations: [
    trigger('children', [
      state(
        'collapsed',
        style({
          height: '0',
        })
      ),
      state(
        'expanded',
        style({
          height: '*',
        })
      ),
      transition(
        'collapsed <=> expanded',
        animate('400ms cubic-bezier(0.86, 0, 0.07, 1)')
      ),
    ]),
  ],
})
export class AppMenuitemComponent implements OnInit {
  private destroyRef = inject(DestroyRef);
  private router = inject(Router);
  private menuService = inject(MenuService);

  @Input() item: any;

  @Input() index!: number;

  @Input() @HostBinding('class.layout-root-menuitem') root!: boolean;

  @Input() parentKey!: string;

  active = false;

  key = '';

  @HostBinding('class.active-menuitem')
  get activeClass() {
    return this.active && !this.root;
  }

  get submenuAnimation() {
    return this.root ? 'expanded' : this.active ? 'expanded' : 'collapsed';
  }

  ngOnInit() {
    this.menuService.menuSource$
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((value) =>
        Promise.resolve(null).then(() => {
          if (value.routeEvent) {
            this.active =
              value.key === this.key || value.key.startsWith(this.key + '-');
          } else {
            if (value.key !== this.key && !value.key.startsWith(this.key + '-'))
              this.active = false;
          }
        })
      );
    this.menuService.resetSource$
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(() => (this.active = false));

    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe(() => {
        if (this.item.routerLink) this.updateActiveStateFromRoute();
      });

    this.key = this.parentKey
      ? this.parentKey + '-' + this.index
      : String(this.index);

    if (this.item.routerLink) this.updateActiveStateFromRoute();
  }

  updateActiveStateFromRoute() {
    const activeRoute = this.router.isActive(this.item.routerLink[0], {
      paths: 'exact',
      queryParams: 'ignored',
      matrixParams: 'ignored',
      fragment: 'ignored',
    });

    if (activeRoute)
      this.menuService.onMenuStateChange({ key: this.key, routeEvent: true });
  }

  itemClick(event: Event) {
    // avoid processing disabled items
    if (this.item.disabled) return event.preventDefault();

    // execute command
    if (this.item.command)
      this.item.command({ originalEvent: event, item: this.item });

    // toggle active state
    if (this.item.items) this.active = !this.active;

    this.menuService.onMenuStateChange({ key: this.key });
  }

  protected readonly JSON = JSON;
}
