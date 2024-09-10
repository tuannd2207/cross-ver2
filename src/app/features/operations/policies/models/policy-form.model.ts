import { FormControl } from '@angular/forms';
import { StatusType } from '@share/share-types.model';

export interface PolicyForm {
  id?: FormControl<string>;
  code: FormControl<string>;
  name: FormControl<string>;
  type: FormControl<string>;
  commissionRecipe: FormControl<string>;
  startDate: FormControl<string | Date>;
  endDate: FormControl<string | Date>;
  status: FormControl<StatusType>;
}
