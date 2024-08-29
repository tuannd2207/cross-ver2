import { Directive, HostListener } from '@angular/core';
import { FormControl, NgControl } from '@angular/forms';

@Directive({
  selector: '[aseTrim]',
  standalone: true,
})
export class AseTrimSpaceDirective {
  constructor(private control: NgControl) {}

  @HostListener('cut', ['$event'])
  @HostListener('paste', ['$event'])
  @HostListener('blur', ['$event'])
  onChange() {
    if (this.control && this.control.control instanceof FormControl) {
      const control = this.control.control;
      const value = control.value?.trim();
      control.setValue(value ?? '');
    }
  }
}
