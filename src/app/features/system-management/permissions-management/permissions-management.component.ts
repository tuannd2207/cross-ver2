import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { AseConfirmDialogComponent } from '@share/ase-confirm-dialog/ase-confirm-dialog.component';
import { AseDataTableComponent } from '@share/ase-data-table/ase-data-table.component';
import { AseFormComponent } from '@share/ase-form/ase-form.component';
import { AseSidebarComponent } from '@share/ase-sidebar/ase-sidebar.component';
import { AseTypographyDirective } from '@share/ase-typography.directive';
import { PaginatorModule } from 'primeng/paginator';
import { TranslateModule } from '@ngx-translate/core';
import { BehaviorSubject } from 'rxjs';
import {
  FormGroup,
  NonNullableFormBuilder,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { TableHeader } from '@share/table-header.model';
import { StatusEnum } from '@app/app.enum';
import { AseIconComponent } from '@share/ase-icon/ase-icon.component';
import { ButtonModule } from 'primeng/button';
import TRANSLATION_PATH from '@app/translation-paths.enum';
import { STATUS_OPTIONS } from '@app/app.constant';
import { PermissionsManagementService } from './services/permissions-management.service';
import {
  IPermissionManagement,
  PermissionManagementActionsType,
  PermissionManagementForm,
} from './models/permissions.model';
import mockData from './mock-data/mock-data';
import { AseEventItem } from '@share/ase-event-item.model';
import { ActionEventsEnum, TypeControlsEnum } from '@share/share-enum';

@Component({
  selector: 'ase-permissions-management',
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
  templateUrl: './permissions-management.component.html',
  styles: [],
  providers: [PermissionsManagementService],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PermissionsManagementComponent implements OnInit {
  protected mockData$ = new BehaviorSubject<IPermissionManagement[]>(mockData);
  private fb = inject(NonNullableFormBuilder);

  clickedItem: IPermissionManagement | null = null;
  actionType: PermissionManagementActionsType = 'EDIT';

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
    {
      label: TRANSLATION_PATH.COMMON + ActionEventsEnum.DELETE,
      action: ActionEventsEnum.DELETE,
      icon: 'delete',
      keyMapAction: 'status',
      keyMapCondition: 'modified',
      showIn: [StatusEnum.PENDING, StatusEnum.INACTIVE, StatusEnum.ACTIVE],
    },
  ];

  cols: TableHeader[] = [
    {
      field: 'groupName',
      header: TRANSLATION_PATH.PERMISSIONS_MANAGEMENT + 'GROUP_NAME',
      width: '248px',
    },
    {
      field: 'groupCode',
      header: TRANSLATION_PATH.PERMISSIONS_MANAGEMENT + 'GROUP_CODE',
    },
    { field: 'description', header: TRANSLATION_PATH.COMMON + 'DESCRIPTION' },
    {
      field: 'status',
      background: true,
      header: TRANSLATION_PATH.COMMON + 'STATUS',
      width: '160px',
    },
  ];

  form: FormGroup<PermissionManagementForm> =
    this.fb.group<PermissionManagementForm>({
      groupName: this.fb.control('', Validators.required),
      groupCode: this.fb.control('', Validators.required),
      description: this.fb.control('', Validators.required),
      status: this.fb.control(StatusEnum.ACTIVE, Validators.required),
    });

  ngOnInit() {
    this.mockData$.subscribe((d) => {
      console.log(d);
    });
  }

  addNewPermissionGroup(): void {
    console.log('hello world');
  }

  onSubmitAction(event: {
    event: PermissionManagementActionsType;
    record: IPermissionManagement;
  }) {
    this.actionType = event.event;
    this.clickedItem = event.record;
    this.form.patchValue(event.record);
  }

  submitForm() {
    const formValue = this.form.getRawValue();
    const prevMockData = this.mockData$.value;

    const newMockData = prevMockData.reduce((arr, curr, idx) => {
      if (curr.groupName === formValue.groupName)
        arr.push({ ...prevMockData[idx], ...formValue, id: Math.random() });
      else arr.push(curr);
      return arr;
    }, [] as IPermissionManagement[]);

    this.mockData$.next(newMockData);
    this.clickedItem = null;
  }

  onClosed() {
    this.form.reset();
    this.clickedItem = null;
  }

  protected readonly TRANSLATION_PATH = TRANSLATION_PATH;
  protected readonly STATUS_OPTIONS = STATUS_OPTIONS;
  protected readonly TypeControlsEnum = TypeControlsEnum;
}
