import { ChangeDetectionStrategy, ChangeDetectorRef, Component, DestroyRef, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AseTypographyDirective } from '@share/ase-typography.directive';
import { ButtonModule } from 'primeng/button';
import { AseSidebarComponent } from '@share/ase-sidebar/ase-sidebar.component';
import { DropdownModule } from 'primeng/dropdown';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { RadioButtonModule } from 'primeng/radiobutton';
import { FormGroup, NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { STATUS_OPTIONS, TYPES_USER } from '@app/app.constant';
import { AseDataTableComponent } from '@share/ase-data-table/ase-data-table.component';

import { TableHeader } from '@share/table-header.model';
import { AseTrimSpaceDirective } from '@share/ase-trim-space.directive';
import { ActionEvent } from '@share/share-types.model';
import { ActionEventsEnum, TypeControlsEnum } from '@share/share-enum';
import { AseIconComponent } from '@share/ase-icon/ase-icon.component';
import * as XLSX from 'xlsx';
import { PaginatorState } from 'primeng/paginator';
import { InputErrorsComponent } from '@share/input-errors/input-errors.component';
import { MarkAllControlsDirtyTriggerChanges } from '@share/share.constant';
import { ForceStatusTypePipe } from '@share/force-status-type.pipe';
import { TagModule } from 'primeng/tag';
import { AseFormComponent } from '@share/ase-form/ase-form.component';
import { UserComparison, UserRequest, UsersManagement } from './models/users-management.model';
import { UsersManagementService } from './services/users-management.service';
import { BehaviorSubject, finalize, map, Observable } from 'rxjs';
import { Pagination } from '@share/pagination.model';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { StatusEnum } from '@app/app.enum';
import { UserForm } from './models/user-form.model';
import TRANSLATION_PATH from '@app/translation-paths.enum';
import { AseConfirmDialogComponent } from '@share/ase-confirm-dialog/ase-confirm-dialog.component';
import { AseBackgroundTagComponent } from '@share/ase-background-tag/ase-background-tag.component';
import { AseEventItem } from '@share/ase-event-item.model';
import { SelectOption } from '@share/select-option.model';
import { AseNotificationService } from '@helper/ase-notification.service';
import { AseBoxDirective } from '@share/ase-box.directive';
import { SelectLabelPipe } from '@share/select-label.pipe';
import { USER_CONTROL_NAME } from './users.constant';
import { UserSearchComponent } from './components/user-search/user-search.component';

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
    AseTypographyDirective,
    AseBoxDirective,
    SelectLabelPipe,
    UserSearchComponent,
  ],
  templateUrl: './users-management.component.html',
  styles: [],
  providers: [UsersManagementService],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UsersManagementComponent {
  readonly TypeControlsEnum = TypeControlsEnum;
  readonly ActionEvents = ActionEventsEnum;
  readonly TYPES_USER = TYPES_USER;
  readonly TRANSLATION_PATH = TRANSLATION_PATH.USER_MANAGEMENT;
  readonly TRANSLATION_PATH_COMMON = TRANSLATION_PATH.COMMON;
  readonly STATUS_OPTIONS = STATUS_OPTIONS;
  readonly USER_CONTROL_NAME = USER_CONTROL_NAME;
  private readonly fb = inject(NonNullableFormBuilder);
  private readonly destroyRef = inject(DestroyRef);
  private readonly userService = inject(UsersManagementService);
  private readonly notificationService = inject(AseNotificationService);
  private readonly cdr = inject(ChangeDetectorRef);
  permissions: string[] = [
    ActionEventsEnum.VIEW,
    ActionEventsEnum.NEW,
    ActionEventsEnum.APPROVE,
    ActionEventsEnum.EDIT,
    ActionEventsEnum.DELETE,
  ];
  actions: AseEventItem[] = this.permissions
    .filter((roles) => roles !== ActionEventsEnum.NEW)
    .map((item) => {
      return {
        label: TRANSLATION_PATH.COMMON + item,
        action: item,
        icon: item.toLowerCase(),
        keyMapAction: 'status',
        showIn: [StatusEnum.PENDING, StatusEnum.INACTIVE, StatusEnum.ACTIVE],
      } as AseEventItem;
    });
  // actions: AseEventItem[] = [
  //   {
  //     label: TRANSLATION_PATH.COMMON + ActionEventsEnum.VIEW,
  //     action: this.ActionEvents.VIEW,
  //     icon: 'eye',
  //     keyMapAction: 'status',
  //     showIn: [StatusEnum.PENDING, StatusEnum.INACTIVE, StatusEnum.ACTIVE],
  //   },
  //   {
  //     label: TRANSLATION_PATH.COMMON + ActionEventsEnum.EDIT,
  //     action: this.ActionEvents.EDIT,
  //     icon: 'edit',
  //     keyMapAction: 'status',
  //     showIn: [StatusEnum.PENDING, StatusEnum.INACTIVE],
  //   },
  //   {
  //     label: TRANSLATION_PATH.COMMON + ActionEventsEnum.DELETE,
  //     action: this.ActionEvents.DELETE,
  //     icon: 'delete',
  //     modified: true,
  //     keyMapAction: 'status',
  //     keyMapCondition: 'modified',
  //     showIn: [StatusEnum.INACTIVE, StatusEnum.PENDING],
  //   },
  //   {
  //     label: TRANSLATION_PATH.COMMON + ActionEventsEnum.APPROVE,
  //     action: this.ActionEvents.APPROVE,
  //     icon: 'approve',
  //     keyMapAction: 'status',
  //     showIn: [StatusEnum.PENDING],
  //   },
  // ];

  pagination: Pagination = {
    pageNumber: 0,
    pageSize: 10,
    pageIndex: 0,
  };
  pageDefault: Pagination = Object.freeze({ ...this.pagination });
  users$: BehaviorSubject<UsersManagement[]> = new BehaviorSubject<
    UsersManagement[]
  >([]);
  user$!: Observable<UsersManagement>;
  compareUserInfo$!: Observable<UserComparison>;
  totalUser = 0;
  isOpenUserDialog = false;
  isOpenApproveDialog = false;
  mangerList: SelectOption[] = [];

  userSearchForm: FormGroup<UserForm> = this.fb.group<UserForm>({
    userCode: this.fb.control(''),
    userLogin: this.fb.control(''),
    fullName: this.fb.control(''),
    userType: this.fb.control(''),
    position: this.fb.control(''),
    department: this.fb.control(''),
    branch: this.fb.control(''),
    area: this.fb.control(''),
    division: this.fb.control(''),
    directManager: this.fb.control(''),
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
    directManager: this.fb.control('', Validators.required),
    status: this.fb.control(StatusEnum.ACTIVE, Validators.required),
  });

  cols: TableHeader[] = [
    { field: 'userCode', header: 'Mã quản lý', disabledSort: true },
    { field: 'fullName', header: 'Tên người dùng' },
    { field: 'userType', header: 'Loại người dùng', background: true },
    { field: 'position', header: 'Chức vụ' },
    { field: 'department', header: 'Phòng ban' },
    { field: 'branch', header: 'Chi nhánh' },
    { field: 'area', header: 'Khu vực' },
    { field: 'division', header: 'Khối' },
    { field: 'managerName', header: 'Quản lý trực tiếp' },
    { field: 'status', header: 'Status', background: true },
  ];
  isDeleteDialog = false;
  recordName?: string;
  actionEvent: ActionEvent = this.ActionEvents.NEW;
  triggerChangeForm = true;
  userId = '';

  constructor() {
    this.loadManagerList();
    this.loadData(this.defaultRequest());
  }

  addNewUser(): void {
    const actionToResetForm: string[] = [
      this.ActionEvents.EDIT,
      this.ActionEvents.VIEW,
    ];
    actionToResetForm.includes(this.actionEvent)
      ? this.usersForm.reset()
      : void 0;
    this.detectChangeForm();
    this.actionEvent = this.ActionEvents.NEW;
    this.isOpenUserDialog = true;
  }

  saveUser() {
    const { value, invalid } = this.usersForm;
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
            this.notificationService.showNotification(
              'success',
              'them moi user thanh cong',
            );
            this.loadData(this.defaultRequest());
          },
        });
    }
    this.isOpenUserDialog = false;
  }

  onSubmitAction($event: { event: ActionEvent; record: UsersManagement }) {
    this.actionEvent = $event.event;
    this.userId = $event.record.id ?? '';
    switch ($event.event) {
      case this.ActionEvents.DELETE:
        this.isDeleteDialog = true;
        this.recordName = $event.record.directManager;
        break;
      case this.ActionEvents.EDIT:
        this.user$ = this.loadUserById($event.record.id ?? '');
        this.isOpenUserDialog = true;
        break;
      case this.ActionEvents.APPROVE:
        this.recordName = $event.record.fullName;
        this.isOpenApproveDialog = true;
        this.compareUserInfo$ = this.userService
          .getInfoApproveUser($event.record.id ?? '')
          .pipe(map((res) => res.data));
        break;
      case this.ActionEvents.VIEW:
        this.user$ = this.loadUserById($event.record.id ?? '');
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
      userInfo: this.userSearchForm.value as UsersManagement,
      ...this.pagination,
    });
  }

  searchUsers(isClickSearch = false): void {
    console.log(isClickSearch);
    console.log(this.userSearchForm.value);
    this.pagination = { ...this.pageDefault };
    const value = this.userSearchForm.value as UsersManagement;
    this.loadData(
      {
        ...this.pageDefault,
        userInfo: value,
      },
      true,
    );
  }

  approveUser(): void {
    this.userService
      .approveOrRejectUser({
        id: this.userId,
        approve: true,
      })
      .pipe(
        finalize(() => {
          this.cdr.detectChanges();
        }),
        takeUntilDestroyed(this.destroyRef),
      )
      .subscribe({
        next: (res) => {
          console.log(res, this.userId);
          this.isOpenApproveDialog = false;
          this.notificationService.showNotification(
            'success',
            'Duyet user thanh cong',
          );
        },
      });
  }

  private loadData(user: UserRequest, isClickSearch = false): void {
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
          this.users$.next(res.data.users);
        },
        error: (err) => {
          console.log(err);
        },
      });
  }

  private loadUserById(id: string): Observable<UsersManagement> {
    return this.userService.findUserById(id).pipe(
      map((res) => {
        this.usersForm.patchValue(res.data);
        this.detectChangeForm();
        return res.data;
      }),
    );
  }

  private loadManagerList(): void {
    this.userService
      .loadAllUSerAsManager()
      .pipe(
        map((res) =>
          res.data.map((item) => ({
            value: item.userCode,
            label: `${item.userCode}_${item.fullName}`,
          })),
        ),
        takeUntilDestroyed(this.destroyRef),
      )
      .subscribe({
        next: (res) => {
          this.mangerList = res;
        },
      });
  }

  private defaultRequest(): UserRequest {
    return {
      userInfo: this.userSearchForm.value as UsersManagement,
      ...this.pageDefault,
    };
  }

  private detectChangeForm(): void {
    this.triggerChangeForm = !this.triggerChangeForm;
  }

  private readFile(value: File): () => void {
    const reader = new FileReader();
    reader.readAsArrayBuffer(value);
    return (reader.onload = () => {
      const data = reader.result;
      const workbook = XLSX.read(data, { type: 'array' });
      const sheetName = workbook.SheetNames[0];
      const sheet1 = workbook.Sheets[sheetName];
      const listUserFromXlsx: UsersManagement[] = XLSX.utils.sheet_to_json(
        sheet1,
        { raw: true },
      ) as UsersManagement[];
      if (this.isInvalidImport(listUserFromXlsx)) return;
      this.userService.importUSer(listUserFromXlsx).subscribe({
        next: (res) => {
          console.log(res);
        },
      });
    });
  }

  private isInvalidImport(users: UsersManagement[]): boolean {
    const listCode: number[] = this.mangerList.map((res) => {
      return Number(res.value);
    });
    const typeUser: string[] = this.TYPES_USER.map((item) => {
      return item.value;
    });
    const isValidType = users.some(
      (item) => !typeUser.includes(String(item.userType)),
    );
    const isValidManagerCode = users.some((item) =>
      listCode.includes(Number(item.directManager)),
    );
    if (isValidManagerCode) {
      this.notificationService.showNotification(
        'error',
        'Ma quan ly ko ton tai',
      );
      return true;
    }
    if (isValidType) {
      this.notificationService.showNotification(
        'error',
        'Loai user khong hop le',
      );
      return true;
    }
    return false;
  }

  addd() {
    this.notificationService.showNotification('success', 'alo')
  }
}
