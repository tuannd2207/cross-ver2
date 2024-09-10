import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableHeader } from '@share/table-header.model';

@Component({
  selector: 'ase-partner-information',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './partner-information.component.html',
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PartnerInformationComponent {
  cols: TableHeader[] = [
    { field: 'userCode', header: 'Mã quản lý', disabledSort: true },
    { field: 'userLogin', header: 'đăng nhập' },
    { field: 'fullName', header: 'Tên người dùng' },
    { field: 'userType', header: 'Loại người dùng', background: true },
    { field: 'managerName', header: 'Quản lý trực tiếp' },
    { field: 'status', header: 'Status', background: true },
  ];
}
