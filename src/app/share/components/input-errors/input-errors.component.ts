import {
  AsyncPipe,
  JsonPipe,
  KeyValuePipe,
  NgForOf,
  NgIf,
} from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { ErrorMapperPipe } from './error-mapper-pipe';
import { map, Observable } from 'rxjs';
import { AseTypographyDirective } from '@share/ase-typography.directive';

@Component({
  selector: 'ase-input-errors',
  standalone: true,
  templateUrl: './input-errors.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    KeyValuePipe,
    ErrorMapperPipe,
    NgForOf,
    JsonPipe,
    NgIf,
    AsyncPipe,
    AseTypographyDirective,
  ],
})
export class InputErrorsComponent {
  @Input() label = '';

  @Input() set control(control: AbstractControl) {
    if (control) {
      this._control = control;
      this.$controlState = control.statusChanges.pipe(map((status) => status));
    }
  }

  $controlState!: Observable<string>;
  _control!: AbstractControl;
}
