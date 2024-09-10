import { FormControl } from '@angular/forms';
import { StatusType } from '@share/share-types.model';

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
  directManager: FormControl<string>;
  status: FormControl<StatusType>;
}

export interface UserFormControl {
  id?: string;
  userCode: string;
  userLogin: string;
  fullName: string;
  userType: string;
  position: string;
  department: string;
  branch: string;
  area: string;
  division: string;
  directManager: string;
  status: string;
}
