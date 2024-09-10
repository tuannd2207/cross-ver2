import {
  AfterViewInit,
  Directive,
  ElementRef,
  HostBinding,
  inject,
  Input,
  Renderer2,
} from '@angular/core';
import { BACKGROUND_COLORS, BORDER_RADIUS } from '@share/typography.model';

@Directive({
  selector: '[aseBox]',
  standalone: true,
})
export class AseBoxDirective implements AfterViewInit {
  @Input() backgroundColor?: BACKGROUND_COLORS;
  @Input() borderColor?: BACKGROUND_COLORS;
  @Input() borderWidth = 0;
  @Input() borderRadius?: BORDER_RADIUS;
  private el = inject(ElementRef);
  private renderer = inject(Renderer2);

  @HostBinding('class')
  protected get computedHostClass() {
    return `${[this.backgroundColor]}-bg border-${[this.borderColor]} radius-${this.borderRadius}`;
  }

  ngAfterViewInit(): void {
    this.setBorderWidth(this.borderWidth);
  }

  private setBorderWidth(width: number) {
    this.renderer.setStyle(this.el.nativeElement, 'border-width', `${width}px`);
    this.renderer.setStyle(this.el.nativeElement, 'border-style', `solid`);
  }
}
