import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { RippleModule } from 'primeng/ripple';
import { SharedModule } from 'primeng/api';
import { TranslateModule } from '@ngx-translate/core';
import { ActionEvent } from '@share/share-types.model';
import TRANSLATION_PATH from '@app/translation-paths.enum';
import { AseTypographyDirective } from '@share/ase-typography.directive';

@Component({
  selector: 'ase-confirm-dialog',
  standalone: true,
  imports: [
    CommonModule,
    ButtonModule,
    DialogModule,
    RippleModule,
    SharedModule,
    TranslateModule,
    AseTypographyDirective,
  ],
  templateUrl: './ase-confirm-dialog.component.html',
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AseConfirmDialogComponent {
  readonly TRANSLATION_TEXT_VIEW = 'SHARE.COMPONENTS.ASE_DIALOG.';
  @Input() dialogType: ActionEvent = 'EDIT';
  @Input() itemName?: string;
  @Input() dialogWidth = '464px';
  @Input() headerTitle = '';
  @Input() visible = false;
  @Input() dialogConfirm = false;
  @Output() doCancel: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() submitForm: EventEmitter<void> = new EventEmitter<void>();
  protected readonly TRANSLATION_PATH = TRANSLATION_PATH;
}
