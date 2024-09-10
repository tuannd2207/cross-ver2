import { StatusEnum } from '@app/app.enum';
import { FormGroup } from '@angular/forms';
import { TypeUserEnum } from '@share/share-enum';
import { StatusType } from '@share/share-types.model';

export const DataToTypeMapping: Record<StatusType | TypeUserEnum, string> = {
  [StatusEnum.PENDING]: 'warning',
  [StatusEnum.ACTIVE]: 'success',
  [StatusEnum.INACTIVE]: 'secondary',
  [TypeUserEnum.INTERNAL]: 'help',
  [TypeUserEnum.EXTERNAL]: 'info',
};

export const MarkAllControlsDirtyTriggerChanges = (
  formGroup: FormGroup
): void => {
  Object.keys(formGroup.controls).forEach((key) => {
    formGroup.controls[key].markAsDirty();
  });
  formGroup.patchValue({ ...formGroup.value });
};
