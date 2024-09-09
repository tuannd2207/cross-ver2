import {ChangeDetectionStrategy, Component, Input} from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'ase-ase-notification',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './ase-notification.component.html',
  styles: [
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AseNotificationComponent {
  @Input() mess!: string;
}
