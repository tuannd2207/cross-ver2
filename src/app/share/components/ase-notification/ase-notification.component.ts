import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  inject,
  Input,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { AseIconComponent } from '@share/ase-icon/ase-icon.component';
import { AseTypographyDirective } from '@share/ase-typography.directive';
import { ToastPositionType } from 'primeng/toast/toast.interface';
import { NotificationType } from '@share/share-types.model';

@Component({
  selector: 'ase-ase-notification',
  standalone: true,
  imports: [
    CommonModule,
    ToastModule,
    AseIconComponent,
    AseTypographyDirective,
  ],
  templateUrl: './ase-notification.component.html',
  providers: [MessageService],
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AseNotificationComponent implements AfterViewInit {
  private cdr = inject(ChangeDetectorRef);
  readonly messageService = inject(MessageService);
  @Input() message = '';
  @Input() position: ToastPositionType = 'top-right';
  @Input() duration = 3000;
  @Input() type: NotificationType = 'info';

  ngAfterViewInit(): void {
    this.messageService.add({
      severity: 'info',
      summary: 'Life',
      detail: this.message,
    });
    this.cdr.detectChanges();
  }
}
