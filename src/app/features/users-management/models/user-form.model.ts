import { FormControl } from '@angular/forms';
import { StatusType } from './users-management.model';

export interface UserForm {
  id?: FormControl<string>;
  userCode: FormControl<string>;
  userLogin: FormControl<string>;
  fullName: FormControl<string>;
  userType: FormControl<string>;
  position: FormControl<string>;
  department: FormControl<string>;
  branch: FormControl<string>;
  area: FormControl<string>;
  division: FormControl<string>;
  managerCode: FormControl<string>;
  status: FormControl<StatusType>;
}
