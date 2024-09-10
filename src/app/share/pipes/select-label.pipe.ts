import { Pipe, PipeTransform } from '@angular/core';
import { SelectOption } from '@share/select-option.model';

@Pipe({
  name: 'selectLabel',
  standalone: true,
})
export class SelectLabelPipe implements PipeTransform {
  transform(value: string, options: SelectOption[]): string {
    if (options && options.length) {
      return options.find((t) => t.value === value)?.label ?? '';
    }
    return value;
  }
}
