import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UserForm } from '../../models/user-form.model';
import { UsersManagement } from '../../models/users-management.model';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { USER_CONTROL_NAME } from '../../users.constant';
import { SelectOption } from '@share/select-option.model';
import { AseDropdownTranslatePipe } from '@share/ase-dropdown-translate.pipe';
import { AseTypographyDirective } from '@share/ase-typography.directive';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'ase-user-search',
  standalone: true,
  imports: [
    CommonModule,
    DropdownModule,
    FormsModule,
    InputTextModule,
    ReactiveFormsModule,
    AseDropdownTranslatePipe,
    AseTypographyDirective,
    TranslateModule,
  ],
  templateUrl: './user-search.component.html',
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserSearchComponent {
  readonly USER_CONTROL_NAME = USER_CONTROL_NAME;
  @Input({ required: true }) userSearchForm!: FormGroup<UserForm>;
  @Input({ required: true }) mangerList: SelectOption[] = [];
  @Input({ required: true }) userType: SelectOption[] = [];
  @Input({ required: true }) statusOptions: SelectOption[] = [];
  @Output() searchChange$ = new EventEmitter<UsersManagement>();
  protected readonly String = String;

  changeValue() {
    this.searchChange$.emit(this.userSearchForm.value as UsersManagement);
  }
}
