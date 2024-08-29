import { Component, EventEmitter, Input, Output } from '@angular/core';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { RippleModule } from 'primeng/ripple';
import {
  KeyValuePipe,
  NgForOf,
  NgIf,
  NgSwitch,
  NgSwitchCase,
  NgTemplateOutlet,
} from '@angular/common';
import { SidebarModule } from 'primeng/sidebar';
import { AseIconComponent } from '@share/ase-icon/ase-icon.component';
import { AseTypographyDirective } from '@share/ase-typography.directive';
import { ActionEvent } from '@share/share-types.model';
import { ActionEventsEnum } from '@share/share-enum';
import { TranslateModule } from '@ngx-translate/core';
import TRANSLATION_PATH from '@app/translation-path.enum';

@Component({
  selector: 'ase-sidebar',
  standalone: true,
  imports: [
    DialogModule,
    ButtonModule,
    InputTextModule,
    RippleModule,
    NgIf,
    NgSwitch,
    NgSwitchCase,
    KeyValuePipe,
    NgForOf,
    NgTemplateOutlet,
    SidebarModule,
    AseIconComponent,
    AseTypographyDirective,
    TranslateModule,
  ],
  templateUrl: './ase-sidebar.component.html',
})
export class AseSidebarComponent {
  readonly TRANSLATION_TEXT_VIEW = 'SHARE.COMPONENTS.ASE_SIDEBAR.';
  @Input() dialogType: ActionEvent = 'EDIT';
  @Input() itemName?: string;
  @Input() dialogWidth = '464px';
  @Input() headerTitle = '';
  @Input() visible = false;
  @Input() dialogConfirm = false;
  @Output() doCancel: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() submitForm: EventEmitter<void> = new EventEmitter<void>();

  protected readonly ActionEventsEnum = ActionEventsEnum;
  protected readonly TRANSLATION_PATH = TRANSLATION_PATH;
}
