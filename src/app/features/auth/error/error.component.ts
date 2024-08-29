import { Component } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'ase-error',
  standalone: true,
  imports: [ButtonModule, RippleModule, RouterLink],
  templateUrl: './error.component.html',
})
export class ErrorComponent {}
