import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'ase-permission-management',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './permission-management.component.html',
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PermissionManagementComponent {}
