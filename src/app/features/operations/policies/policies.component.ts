import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableHeader } from '@share/table-header.model';
import { FormGroup, NonNullableFormBuilder, Validators } from '@angular/forms';
import { PolicyForm } from './models/policy-form.model';
import { StatusEnum } from '@app/app.enum';
import { AseIconComponent } from '@share/ase-icon/ase-icon.component';
import { AseTypographyDirective } from '@share/ase-typography.directive';
import { ButtonModule } from 'primeng/button';
import { TranslateModule } from '@ngx-translate/core';
import TRANSLATION_PATH from '@app/translation-paths.enum';
@Component({
  selector: 'ase-policies',
  standalone: true,
  imports: [
    CommonModule,
    AseIconComponent,
    AseTypographyDirective,
    ButtonModule,
    TranslateModule,
  ],
  templateUrl: './policies.component.html',
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PoliciesComponent {
  private readonly fb = inject(NonNullableFormBuilder);
  readonly TRANSLATION_PATH = TRANSLATION_PATH.POLICIES;
  readonly TRANSLATION_COMMON_PATH = TRANSLATION_PATH.COMMON;
  cols: TableHeader[] = [
    { field: 'code', header: 'Mã chính sách', disabledSort: true },
    { field: 'name', header: 'Tên chính sách' },
    { field: 'type', header: 'Loại' },
    { field: 'commissionRecipe', header: 'Biểu hoa hồng' },
    { field: 'startDate', header: 'Từ ngày' },
    { field: 'endDate', header: 'Đến ngày' },
    { field: 'status', header: 'Trạng thái', background: true },
  ];

  policiesForm: FormGroup<PolicyForm> = this.fb.group<PolicyForm>({
    id: this.fb.control(''),
    code: this.fb.control('', Validators.required),
    commissionRecipe: this.fb.control('', Validators.required),
    endDate: this.fb.control('', Validators.required),
    name: this.fb.control('', Validators.required),
    startDate: this.fb.control('', Validators.required),
    status: this.fb.control(StatusEnum.ACTIVE, Validators.required),
    type: this.fb.control('', Validators.required),
  });

  policiesFormSearch: FormGroup<PolicyForm> = this.fb.group<PolicyForm>({
    code: this.fb.control(''),
    commissionRecipe: this.fb.control(''),
    endDate: this.fb.control(''),
    name: this.fb.control(''),
    startDate: this.fb.control(''),
    status: this.fb.control(StatusEnum.ACTIVE),
    type: this.fb.control(''),
  });

  addNewPolicy() {
    console.log('s');
  }
}
