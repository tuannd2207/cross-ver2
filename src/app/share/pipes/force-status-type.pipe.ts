import { Pipe, PipeTransform } from '@angular/core';
import { StatusType } from '../../features/users-management/models/users-management.model';
import { TypeUserEnum } from '@share/share-enum';

@Pipe({
  name: 'aseForceSttType',
  standalone: true,
})
export class ForceStatusTypePipe implements PipeTransform {
  transform(value: unknown): StatusType {
    return (value as StatusType) || TypeUserEnum;
  }
}
