import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { PasswordModule } from 'primeng/password';
import { CheckboxModule } from 'primeng/checkbox';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';
import { AuthService } from '@helper/auth.service';
import { Router } from '@angular/router';
import { ILdapLoginRes } from '@helper/iLdap-login-res';
import { LocalStorageJwtService } from '@helper/local-storage-jwt.service';
import { BodyModel } from '@helper/response.model';
import { AseIconComponent } from '@share/ase-icon/ase-icon.component';
import { AseTypographyDirective } from '@share/ase-typography.directive';

@Component({
  selector: 'ase-login',
  templateUrl: './login.component.html',
  standalone: true,
  imports: [
    FormsModule,
    PasswordModule,
    CheckboxModule,
    InputTextModule,
    ButtonModule,
    RippleModule,
    AseIconComponent,
    AseTypographyDirective,
  ],
  styles: [
    `
      :host ::ng-deep .pi-eye,
      :host ::ng-deep .pi-eye-slash {
        transform: scale(1.6);
        margin-right: 1rem;
        color: var(--primary-color) !important;
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent {
  password!: string;
  username!: string;
  private readonly authService = inject(AuthService);
  private router = inject(Router);
  private localStorageService = inject(LocalStorageJwtService);

  // valCheck: string[] = ['remember'];
  login() {
    this.authService.login(this.username, this.password).subscribe({
      next: (body: BodyModel<ILdapLoginRes>) => {
        this.localStorageService.setItem(body.data.token);
        this.router.navigateByUrl('/system-management/parameters');
      },
      error: (err) => console.log(err),
    });
  }
}
