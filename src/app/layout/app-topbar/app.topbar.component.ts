import {
  Component,
  ElementRef,
  inject,
  signal,
  ViewChild,
} from '@angular/core';
import { MenuItem, SharedModule } from 'primeng/api';
import { LayoutService } from '../service/app.layout.service';
import { Lang, ThemeTypeEnum } from '@app/app.enum';
import { I18nService } from '@app/i18n.service';
import { NgClass, NgIf } from '@angular/common';
import { RouterLink } from '@angular/router';
import { MenuModule } from 'primeng/menu';
import { ToggleButtonModule } from 'primeng/togglebutton';
import { FormsModule } from '@angular/forms';
import { AseIconComponent } from '@share/ase-icon/ase-icon.component';
import { LocalStorageJwtService } from '@helper/local-storage-jwt.service';
import { AvatarModule } from 'primeng/avatar';
import { AseTypographyDirective } from '@share/ase-typography.directive';

@Component({
  selector: 'ase-topbar',
  templateUrl: './app.topbar.component.html',
  standalone: true,
  imports: [
    NgClass,
    RouterLink,
    MenuModule,
    ToggleButtonModule,
    FormsModule,
    NgIf,
    AseIconComponent,
    SharedModule,
    AvatarModule,
    AseTypographyDirective,
  ],
})
export class AppTopBarComponent {
  @ViewChild('menubutton') menuButton!: ElementRef;
  @ViewChild('topbarmenubutton') topbarMenuButton!: ElementRef;
  @ViewChild('topbarmenu') menu!: ElementRef;
  layoutService = inject(LayoutService);
  items: MenuItem[] = [
    {
      label: 'Options',
      items: [
        {
          label: 'Logout',
          icon: 'pi pi-sign-out',
          routerLink: '/auth/login',
        },
      ],
    },
  ];
  toggleLang = true;
  valSwitch = false;
  errorImg = signal(false);
  private localStorageService = inject(LocalStorageJwtService);
  private i18nService = inject(I18nService);

  toggleTheme(): void {
    this.valSwitch = !this.valSwitch;
    this.layoutService.setTheme(
      this.valSwitch ? ThemeTypeEnum.dark : ThemeTypeEnum.light
    );
  }

  logOut(): void {
    this.localStorageService.removeItem();
  }

  switchLanguage(): void {
    this.toggleLang = !this.toggleLang;
    this.i18nService.setLanguage(this.toggleLang ? Lang.vi : Lang.en);
  }

  checkIfLoadImgError($event: Event) {
    $event.type === 'error' ? this.errorImg.set(true) : void 0;
  }
}
