import {
  ChangeDetectionStrategy,
  Component,
  HostBinding,
  Input,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActionEventsEnum, TypeControlsEnum } from '@share/share-enum';
import { DropdownModule } from 'primeng/dropdown';
import { InputErrorsComponent } from '@share/input-errors/input-errors.component';
import { InputTextModule } from 'primeng/inputtext';
import { PaginatorModule } from 'primeng/paginator';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { RadioButtonModule } from 'primeng/radiobutton';
import { AseBackgroundTagComponent } from '@share/ase-background-tag/ase-background-tag.component';
import { ActionEvent, ControlType } from '@share/share-types.model';
import TRANSLATION_PATH from '@app/translation-path.enum';
import { AseTypographyDirective } from '@share/ase-typography.directive';
import { TranslateModule } from '@ngx-translate/core';

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
  ],
  templateUrl: './ase-form.component.html',
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AseFormComponent<T> {
  readonly ActionEvents = ActionEventsEnum;
  readonly TypeControlsEnum = TypeControlsEnum;
  @Input() options: T[] = [];
  @Input() controlTypes: ControlType = TypeControlsEnum.INPUT;
  @Input() triggerChange?: boolean;
  @Input({ required: true }) label = '';
  @Input({ required: true }) formGroup!: FormGroup;
  @Input() maxLength!: number;
  @Input({ required: true }) controlName = '';
  @Input({ required: true }) actionEvent: ActionEvent = this.ActionEvents.NEW;

  @HostBinding('class')
  protected get computedHostClass() {
    return this.actionEvent === this.ActionEvents.VIEW
      ? `col-12 flex justify-content-between ase-mb8`
      : void 0;
  }

  protected readonly TRANSLATION_PATH = TRANSLATION_PATH;
  protected readonly String = String;
}
