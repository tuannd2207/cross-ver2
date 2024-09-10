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
import {
  ISystemParameter,
  ParameterForm,
  SystemParametersActionsType,
} from './models/system-parameters.model';
import TRANSLATION_PATH from '@app/translation-paths.enum';
import { ActionEventsEnum, TypeControlsEnum } from '@share/share-enum';
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
import { STATUS_OPTIONS } from '@app/app.constant';
import { BehaviorSubject } from 'rxjs';
import { AseConfirmDialogComponent } from '@share/ase-confirm-dialog/ase-confirm-dialog.component';
import { AseEventItem } from '@share/ase-event-item.model';
import { ActionEvent } from '@share/share-types.model';

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
  private service = inject(SystemParametersService);
  readonly STATUS_OPTIONS = STATUS_OPTIONS;
  readonly TypeControlsEnum = TypeControlsEnum;
  protected data$ = new BehaviorSubject<ISystemParameter[]>([]);
  private fb = inject(NonNullableFormBuilder);

  clickedItem: ISystemParameter | null = null;
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

  actions: AseEventItem[] = [
    {
      label: TRANSLATION_PATH.COMMON + ActionEventsEnum.VIEW,
      action: ActionEventsEnum.VIEW,
      icon: 'eye',
      keyMapAction: 'status',
      showIn: [StatusEnum.PENDING, StatusEnum.INACTIVE, StatusEnum.ACTIVE],
    },
    {
      label: TRANSLATION_PATH.COMMON + ActionEventsEnum.EDIT,
      action: ActionEventsEnum.EDIT,
      icon: 'edit',
      keyMapAction: 'status',
      showIn: [StatusEnum.PENDING, StatusEnum.INACTIVE, StatusEnum.ACTIVE],
    },
    {
      label: TRANSLATION_PATH.COMMON + ActionEventsEnum.APPROVE,
      action: ActionEventsEnum.APPROVE,
      icon: 'approve',
      keyMapAction: 'status',
      showIn: [StatusEnum.PENDING],
    },
  ];

  form: FormGroup<ParameterForm> = this.fb.group<ParameterForm>({
    name: this.fb.control({ value: '', disabled: true }, Validators.required),
    value: this.fb.control('', Validators.required),
    description: this.fb.control(
      { value: '', disabled: true },
      Validators.required
    ),
    status: this.fb.control(StatusEnum.ACTIVE, Validators.required),
  });

  ngOnInit() {
    this.service
      .getAllParameters()
      .subscribe((res) => this.data$.next(res.data));
  }

  onSubmitAction(event: {
    event: SystemParametersActionsType;
    record: ISystemParameter;
  }) {
    this.form.patchValue(event.record);
    this.actionType = event.event;
    this.clickedItem = event.record;
  }

  submitForm($event: ActionEvent) {
    switch ($event) {
      case ActionEventsEnum.EDIT:
        break;
      case ActionEventsEnum.APPROVE:
        break;
    }
  }

  onClosed() {
    this.clickedItem = null;
    this.form.reset();
  }

  protected readonly TRANSLATION_PATH = TRANSLATION_PATH;
}
