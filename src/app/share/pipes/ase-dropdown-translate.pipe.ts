import { Pipe, PipeTransform } from '@angular/core';
import { SelectOption } from '@share/select-option.model';

@Pipe({
  name: 'aseDropdownTranslate',
  standalone: true,
})
export class AseDropdownTranslatePipe implements PipeTransform {
  transform(selected: string, option: SelectOption[]): string {
    return option.find((t) => t.value === selected)?.label ?? '';
  }
}
