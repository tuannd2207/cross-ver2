import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';

@Component({
  selector: 'ase-access',
  standalone: true,
  imports: [RouterLink, ButtonModule, RippleModule],
  templateUrl: './access.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AccessComponent {}
