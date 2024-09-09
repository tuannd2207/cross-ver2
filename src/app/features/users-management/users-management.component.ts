import {ChangeDetectionStrategy, ChangeDetectorRef, Component, DestroyRef, inject,} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AseTypographyDirective} from '@share/ase-typography.directive';
import {ButtonModule} from 'primeng/button';
import {AseSidebarComponent} from '@share/ase-sidebar/ase-sidebar.component';
import {DropdownModule} from 'primeng/dropdown';
import {InputNumberModule} from 'primeng/inputnumber';
import {InputTextModule} from 'primeng/inputtext';
import {InputTextareaModule} from 'primeng/inputtextarea';
import {RadioButtonModule} from 'primeng/radiobutton';
import {FormGroup, NonNullableFormBuilder, ReactiveFormsModule, Validators,} from '@angular/forms';
import {TranslateModule} from '@ngx-translate/core';
import {STATUS_ITEMS, TYPES_USER} from '@app/app.constant';
import {AseDataTableComponent, AseMenuItem} from '@share/ase-data-table/ase-data-table.component';

import {TableHeader} from '@share/table-header.model';
import {AseTrimSpaceDirective} from '@share/ase-trim-space.directive';
import {ActionEvent} from '@share/share-types.model';
import {ActionEventsEnum, TypeControlsEnum} from '@share/share-enum';
import {AseIconComponent} from '@share/ase-icon/ase-icon.component';
import * as XLSX from 'xlsx';
import {PaginatorState} from 'primeng/paginator';
import {InputErrorsComponent} from '@share/input-errors/input-errors.component';
import {MarkAllControlsDirtyTriggerChanges} from '@share/share.constant';
import {ForceStatusTypePipe} from '@share/force-status-type.pipe';
import {TagModule} from 'primeng/tag';
import {AseFormComponent} from '@share/ase-form/ase-form.component';
import {UserRequest, UsersManagement} from './models/users-management.model';
import {UsersManagementService} from './services/users-management.service';
import {BehaviorSubject, map} from 'rxjs';
import {Pagination} from '@share/pagination.model';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';
import {StatusEnum} from '@app/app.enum';
import {UserForm} from './models/user-form.model';
import {BodyModel} from '@helper/response.model';
import TRANSLATION_PATH from '@app/translation-path.enum';
import {AseConfirmDialogComponent} from '@share/ase-confirm-dialog/ase-confirm-dialog.component';
import {AseBackgroundTagComponent} from '@share/ase-background-tag/ase-background-tag.component';
import {SystemParametersActionsEnum} from "../system-parameters/models/system-parameters.model";
import {NotificationServiceService} from "@helper/notification-service.service";

@Component({
  selector: 'ase-users-management',
  standalone: true,
  imports: [
    CommonModule,
    AseTypographyDirective,
    ButtonModule,
    AseSidebarComponent,
    DropdownModule,
    InputNumberModule,
    InputTextModule,
    InputTextareaModule,
    RadioButtonModule,
    ReactiveFormsModule,
    TranslateModule,
    AseDataTableComponent,
    AseTrimSpaceDirective,
    AseIconComponent,
    InputErrorsComponent,
    ForceStatusTypePipe,
    TagModule,
    AseBackgroundTagComponent,
    AseFormComponent,
    AseConfirmDialogComponent,
  ],
  templateUrl: './users-management.component.html',
  styles: [],
  providers: [UsersManagementService],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UsersManagementComponent {
  protected readonly STATUS_ITEMS = STATUS_ITEMS;
  readonly TypeControlsEnum = TypeControlsEnum;
  readonly ActionEvents = ActionEventsEnum;
  readonly TYPES_USER = TYPES_USER;
  readonly TRANSLATION_PATH = TRANSLATION_PATH.USER_MANAGEMENT;
  private readonly fb = inject(NonNullableFormBuilder);
  private readonly destroyRef = inject(DestroyRef);
  private userService = inject(UsersManagementService);
  private readonly changeDetectorRef = inject(ChangeDetectorRef);
  private readonly notifi = inject(NotificationServiceService);

  actions: AseMenuItem[] = [
    {
      label: TRANSLATION_PATH.COMMON + ActionEventsEnum.VIEW,
      action: this.ActionEvents.VIEW,
      icon: 'eye',
      keyMapAction: 'status',
      showIn: ['PENDING', 'INACTIVE', 'ACTIVE']
    },
    {
      label: TRANSLATION_PATH.COMMON + ActionEventsEnum.EDIT,
      action: this.ActionEvents.EDIT,
      icon: 'edit',
      keyMapAction: 'status',
      showIn: ['PENDING', 'INACTIVE']
    },
    {
      label: TRANSLATION_PATH.COMMON + ActionEventsEnum.DELETE,
      action: this.ActionEvents.DELETE,
      icon: 'delete',
      keyMapAction: 'status',
      showIn: ['INACTIVE']
    },
    {
      label: TRANSLATION_PATH.COMMON + ActionEventsEnum.APPROVE,
      action: SystemParametersActionsEnum.APPROVE,
      icon: 'approve',
      keyMapAction: 'status',
      showIn: ['PENDING']
    }
  ];

  pagination: Pagination = {
    pageNumber: 0,
    pageSize: 10,
    pageIndex: 0,
  };
  pageDefault: Pagination = Object.freeze({...this.pagination});
  user$: BehaviorSubject<UsersManagement[]> = new BehaviorSubject<
    UsersManagement[]
  >([]);
  totalUser = 0;
  isOpenUserDialog = false;
  mangerList: string[] = [];

  userSearchForm: FormGroup = this.fb.group<UserForm>({
    userCode: this.fb.control(''),
    userLogin: this.fb.control(''),
    fullName: this.fb.control(''),
    userType: this.fb.control(''),
    position: this.fb.control(''),
    department: this.fb.control(''),
    branch: this.fb.control(''),
    area: this.fb.control(''),
    division: this.fb.control(''),
    managerCode: this.fb.control(''),
    status: this.fb.control(StatusEnum.ACTIVE),
  });

  usersForm: FormGroup<UserForm> = this.fb.group<UserForm>({
    id: this.fb.control(''),
    userCode: this.fb.control(''),
    userLogin: this.fb.control('', Validators.required),
    fullName: this.fb.control('', Validators.required),
    userType: this.fb.control('', Validators.required),
    position: this.fb.control('', Validators.required),
    department: this.fb.control('', Validators.required),
    branch: this.fb.control('', Validators.required),
    area: this.fb.control('', Validators.required),
    division: this.fb.control('', Validators.required),
    managerCode: this.fb.control('', Validators.required),
    status: this.fb.control(StatusEnum.ACTIVE, Validators.required),
  });

  cols: TableHeader[] = [
    {field: 'managerCode', header: 'Mã quản lý', disabledSort: true},
    {field: 'fullName', header: 'Tên người dùng'},
    {field: 'userType', header: 'Loại người dùng', background: true},
    {field: 'position', header: 'Chức vụ'},
    {field: 'department', header: 'Phòng ban'},
    {field: 'branch', header: 'Chi nhánh'},
    {field: 'area', header: 'Khu vực'},
    {field: 'division', header: 'Khối'},
    {field: 'managerName', header: 'Quản lý trực tiếp'},
    {field: 'status', header: 'Status', background: true},
  ];
  isDeleteDialog = false;
  recordName?: string;
  actionEvent: ActionEvent = this.ActionEvents.NEW;
  triggerChangeForm = true;

  constructor() {
    this.loadManagerList();
    this.loadData(this.defaultRequest());
  }

  addNewUser(): void {
    this.isOpenUserDialog = true;
    if (['EDIT', 'VIEW'].includes(this.actionEvent)) this.usersForm.reset();

    this.detectChangeForm();
    this.actionEvent = this.ActionEvents.NEW;
    this.isOpenUserDialog = true;
  }

  saveUser() {
    const {value, invalid} = this.usersForm;
    MarkAllControlsDirtyTriggerChanges(this.usersForm);
    if (invalid) return;
    if (this.actionEvent === this.ActionEvents.EDIT) {
      // const data = this.users.map((item) => {
      //   if (item.id === value.id) {
      //     return value;
      //   }
      //   return item;
      // });
      // this.users = [...data];
    } else {
      this.userService
        .addUser(value as UsersManagement)
        .pipe(takeUntilDestroyed(this.destroyRef))
        .subscribe({
          next: () => {
            this.loadData(this.defaultRequest());
          },
        });
    }
    this.isOpenUserDialog = false;
  }

  onSubmitAction($event: { event: ActionEvent; record: UsersManagement }) {
    this.actionEvent = $event.event;
    switch ($event.event) {
      case this.ActionEvents.DELETE:
        this.isDeleteDialog = true;
        this.recordName = $event.record.managerCode;
        break;
      case this.ActionEvents.EDIT:
        this.loadUserById($event.record.id ?? '');
        this.isOpenUserDialog = true;
        break;
      case this.ActionEvents.APPROVE:
        this.recordName = $event.record.fullName;
        break;
      case this.ActionEvents.VIEW:
        this.loadUserById($event.record.id ?? '');
        this.isOpenUserDialog = true;
        break;
    }
  }

  importFile($event: Event) {
    const file = $event.target as HTMLInputElement;
    if (file.files) {
      const value = file?.files[0] as File;
      this.readFile(value);
    }
  }

  submitDelete(): void {
    this.isDeleteDialog = false;
  }

  onPageChange($event: PaginatorState) {
    this.pagination.pageIndex = $event.page ?? 0;
    this.pagination.pageSize = Number($event.rows);
    this.loadData({
      userInfo: this.userSearchForm.value,
      ...this.pagination,
    });
  }

  private readFile(value: File): () => void {
    const reader = new FileReader();
    reader.readAsArrayBuffer(value);
    return (reader.onload = () => {
      const data = reader.result;
      const workbook = XLSX.read(data, {type: 'array'});
      const sheetName = workbook.SheetNames[0];
      const sheet1 = workbook.Sheets[sheetName];
      const listUserFromXlsx: UsersManagement[] = XLSX.utils.sheet_to_json(
        sheet1,
        {raw: true}
      ) as UsersManagement[];
      console.log(this.isInvalid(listUserFromXlsx));
      this.changeDetectorRef.markForCheck();
    });
  }

  searchUsers(isClickSearch = false): void {
    console.log(isClickSearch);
    this.pagination = {...this.pageDefault};
    this.loadData({...this.pageDefault, ...this.userSearchForm.value}, true);
  }

  private loadData(user: UserRequest, isClickSearch = false): void {
    this.notifi.createComponent('cgfg');
    this.pagination.pageNumber = isClickSearch
      ? this.pagination.pageNumber
      : this.pagination.pageIndex;
    user.pageNumber = this.pagination.pageNumber;
    this.userService
      .loadAllUsers(user)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (res) => {
          console.log(res.data);
          this.totalUser = res.data.totalElements ?? 0;
          this.user$.next(res.data.users);
        },
        error: (err) => {
          console.log(err);
        },
      });
  }

  private loadUserById(id: string): void {
    this.userService
      .findUserById(id)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (res: BodyModel<UsersManagement>) => {
          this.usersForm.patchValue(res.data);
          this.detectChangeForm();
        },
        error: (err) => {
          console.log(err);
        },
      });
  }

  private loadManagerList(): void {
    this.userService
      .loadAllUSerAsManager()
      .pipe(
        map((res) => res.data.map((item) => item.userCode)),
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe({
        next: (res) => {
          this.mangerList = res;
        },
      });
  }

  private defaultRequest(): UserRequest {
    return {
      userInfo: this.userSearchForm.value,
      ...this.pageDefault,
    };
  }

  private detectChangeForm(): void {
    this.triggerChangeForm = !this.triggerChangeForm;
  }

  private isInvalid(users: UsersManagement[]): boolean {
    console.log(users);
    const listCode: number[] = this.mangerList.map((res) => {
      return Number(res);
    });
    const typeUser: string[] = this.TYPES_USER;
    const isValidType = users.some(
      (item) => !typeUser.includes(String(item.userType))
    );
    const isValidManagerCode = users.some((item) =>
      listCode.includes(Number(item.managerCode))
    );
    return isValidType || isValidManagerCode;
  }
}
