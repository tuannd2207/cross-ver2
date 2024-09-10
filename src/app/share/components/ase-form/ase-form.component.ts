import {
  ChangeDetectionStrategy,
  Component,
  HostBinding,
  Input,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  ActionEventsEnum,
  ControlType,
  TypeControlsEnum,
} from '@share/share-enum';
import { DropdownModule } from 'primeng/dropdown';
import { InputErrorsComponent } from '@share/input-errors/input-errors.component';
import { InputTextModule } from 'primeng/inputtext';
import { PaginatorModule } from 'primeng/paginator';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { RadioButtonModule } from 'primeng/radiobutton';
import { AseBackgroundTagComponent } from '@share/ase-background-tag/ase-background-tag.component';
import { ActionEvent } from '@share/share-types.model';
import TRANSLATION_PATH from '@app/translation-paths.enum';
import { AseTypographyDirective } from '@share/ase-typography.directive';
import { TranslateModule } from '@ngx-translate/core';
import { SelectOption } from '@share/select-option.model';
import { AseDropdownTranslatePipe } from '@share/ase-dropdown-translate.pipe';
import { SelectLabelPipe } from '@share/select-label.pipe';
import { AseTrimSpaceDirective } from '@share/ase-trim-space.directive';

@Component({
  selector: 'ase-form',
  standalone: true,
  imports: [
    CommonModule,
    AseBackgroundTagComponent,
    DropdownModule,
    InputErrorsComponent,
    InputTextModule,
    PaginatorModule,
    ReactiveFormsModule,
    RadioButtonModule,
    AseTypographyDirective,
    TranslateModule,
    AseDropdownTranslatePipe,
    SelectLabelPipe,
    AseTrimSpaceDirective,
  ],
  templateUrl: './ase-form.component.html',
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AseFormComponent {
  readonly TRANSLATION_PATH = TRANSLATION_PATH;
  readonly ActionEvents = ActionEventsEnum;
  readonly TypeControlsEnum = TypeControlsEnum;
  readonly controlsDisplayWithTag: string[] = ['status', 'userType'];
  readonly actionsModify: string[] = [
    this.ActionEvents.NEW,
    this.ActionEvents.EDIT,
  ];
  @Input() dataView: unknown;
  @Input() options: SelectOption[] = [];
  @Input() controlTypes: ControlType = TypeControlsEnum.INPUT;
  @Input() triggerChange?: boolean;
  @Input({ required: true }) label = '';
  @Input() areaRows = 3;
  @Input() areaColumns = 3;
  @Input({ required: true }) formGroup!: FormGroup;
  @Input() maxLength!: number;
  @Input({ required: true }) controlName = '';
  @Input({ required: true }) actionEvent: ActionEvent = this.ActionEvents.NEW;

  @HostBinding('class')
  protected get computedHostClass() {
    return !this.actionsModify.includes(this.actionEvent)
      ? `col-12 flex justify-content-between ase-mb8`
      : void 0;
  }
}
