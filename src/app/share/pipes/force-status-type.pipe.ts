import { Pipe, PipeTransform } from '@angular/core';
import { TypeUserEnum } from '@share/share-enum';
import { StatusType } from '@share/share-types.model';

@Pipe({
  name: 'aseForceSttType',
  standalone: true,
})
export class ForceStatusTypePipe implements PipeTransform {
  transform(value: unknown): StatusType {
    return (value as StatusType) || TypeUserEnum;
  }
}
