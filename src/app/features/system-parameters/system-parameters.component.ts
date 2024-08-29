import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { AseIconComponent } from '@share/ase-icon/ase-icon.component';
import { AseTypographyDirective } from '@share/ase-typography.directive';
import { ButtonModule } from 'primeng/button';
import { TranslateModule } from '@ngx-translate/core';
import { AseDataTableComponent } from '@share/ase-data-table/ase-data-table.component';
import { TableHeader } from '@share/table-header.model';
import { SystemParametersService } from './services/system-parameters.service';
import MockData from './mock-data/mock-data';
import mockData from './mock-data/mock-data';
import {
  ISystemParameter,
  ParameterForm,
  SystemParametersActionsEnum,
  SystemParametersActionsType,
} from './models/system-parameters.model';
import TRANSLATION_PATH from '@app/translation-path.enum';
import { ActionEventsEnum } from '@share/share-enum';
import { AseSidebarComponent } from '@share/ase-sidebar/ase-sidebar.component';
import { AseFormComponent } from '@share/ase-form/ase-form.component';
import { PaginatorModule } from 'primeng/paginator';
import {
  FormGroup,
  NonNullableFormBuilder,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { StatusEnum } from '@app/app.enum';
import { STATUS_ITEMS } from '@app/app.constant';
import { BehaviorSubject } from 'rxjs';
import { AseConfirmDialogComponent } from '@share/ase-confirm-dialog/ase-confirm-dialog.component';

@Component({
  selector: 'ase-system-parameters',
  standalone: true,
  imports: [
    CommonModule,
    AseIconComponent,
    AseTypographyDirective,
    ButtonModule,
    TranslateModule,
    AseDataTableComponent,
    AseSidebarComponent,
    AseFormComponent,
    PaginatorModule,
    ReactiveFormsModule,
    AseConfirmDialogComponent,
  ],
  templateUrl: './system-parameters.component.html',
  styles: [],
  providers: [SystemParametersService],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SystemParametersComponent implements OnInit {
  protected mockData$ = new BehaviorSubject<ISystemParameter[]>(
    mockData.map((d) => ({
      ...d,
      actions:
        d.status === 'PENDING'
          ? [
              {
                label:
                  TRANSLATION_PATH.COMMON + SystemParametersActionsEnum.EDIT,
                action: SystemParametersActionsEnum.EDIT,
                icon: 'edit',
              },
              {
                label: TRANSLATION_PATH.COMMON + ActionEventsEnum.APPROVE,
                action: SystemParametersActionsEnum.APPROVE,
                icon: 'approve',
              },
            ]
          : [
              {
                label:
                  TRANSLATION_PATH.COMMON + SystemParametersActionsEnum.EDIT,
                action: SystemParametersActionsEnum.EDIT,
                icon: 'edit',
              },
            ],
    }))
  );
  private fb = inject(NonNullableFormBuilder);

  openConfirm = false;
  clickedParameter: ISystemParameter | null = null;
  actionType: SystemParametersActionsType = 'EDIT';

  cols: TableHeader[] = [
    {
      field: 'id',
      header: TRANSLATION_PATH.SYSTEM_PARAMETERS + 'PARAMETER_NAME',
      width: '224px',
    },
    { field: 'name', header: TRANSLATION_PATH.COMMON + 'VALUE' },
    { field: 'description', header: TRANSLATION_PATH.COMMON + 'DESCRIPTION' },
    {
      field: 'status',
      background: true,
      header: TRANSLATION_PATH.COMMON + 'STATUS',
      width: '160px',
    },
  ];

  parameterForm: FormGroup<ParameterForm> = this.fb.group<ParameterForm>({
    id: this.fb.control(1, Validators.required),
    name: this.fb.control({ value: '', disabled: true }, Validators.required),
    value: this.fb.control(
      { value: '', disabled: this.actionType === 'APPROVE' },
      [Validators.required]
    ),
    description: this.fb.control(
      { value: '', disabled: true },
      Validators.required
    ),
    status: this.fb.control(
      { value: StatusEnum.ACTIVE, disabled: this.actionType === 'APPROVE' },
      Validators.required
    ),
  });

  ngOnInit() {
    console.log(MockData);
  }

  onSubmitAction(event: {
    event: SystemParametersActionsType;
    record: ISystemParameter;
  }) {
    this.parameterForm.patchValue(event.record);
    this.actionType = event.event;
    this.clickedParameter = event.record;
  }

  validateForm() {
    this.parameterForm.markAllAsTouched();
    if (this.parameterForm.invalid) return;

    if (!this.parameterForm.pristine || this.actionType === 'APPROVE') {
      this.openConfirm = true;
      return;
    }

    this.clickedParameter = null;
  }

  submitForm() {
    const formValue = this.parameterForm.getRawValue();
    const prevMockData = this.mockData$.value;

    const newMockData = prevMockData.reduce((arr, curr) => {
      if (curr.id === formValue.id) arr.push(formValue);
      else arr.push(curr);
      return arr;
    }, [] as ISystemParameter[]);

    this.clickedParameter = null;
    this.mockData$.next(newMockData);
    this.openConfirm = false;
    this.clickedParameter = null;
  }

  onClosed() {
    this.clickedParameter = null;
  }

  protected readonly TRANSLATION_PATH = TRANSLATION_PATH;
  protected readonly STATUS_ITEMS = STATUS_ITEMS;
}
