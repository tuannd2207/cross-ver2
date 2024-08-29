import { Pipe, PipeTransform } from '@angular/core';
import { ERROR_MESSAGES } from './error-messages';

// only use for this component
@Pipe({
  name: 'errorMapper',
  standalone: true,
})
export class ErrorMapperPipe implements PipeTransform {
  transform(
    key: string,
    errValue: Record<string, string>,
    label: string
  ): string {
    if (!ERROR_MESSAGES(label)[key]) {
      return '';
    }
    return ERROR_MESSAGES(label)[key](errValue);
  }
}
