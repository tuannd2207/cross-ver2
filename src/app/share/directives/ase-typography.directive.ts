import {
  AfterViewInit,
  Directive,
  ElementRef,
  HostBinding,
  inject,
  Input,
  Renderer2,
} from '@angular/core';
import {
  BACKGROUND_COLORS,
  FONT_SIZE_TYPE,
  FONT_WEIGHT,
  TEXT_COLORS,
} from '@share/typography.model';

@Directive({
  selector: '[aseTypography]',
  standalone: true,
})
export class AseTypographyDirective implements AfterViewInit {
  @Input() fontSize?: FONT_SIZE_TYPE;
  @Input() textColor?: TEXT_COLORS;
  @Input() backgroundColor?: BACKGROUND_COLORS;
  @Input() fontWeight?: FONT_WEIGHT;
  @Input() textTransform?: 'uppercase' | 'capitalize';
  @Input() lineHeight?: number;
  private el = inject(ElementRef);
  private renderer = inject(Renderer2);
  @HostBinding('class')
  protected get computedHostClass() {
    return `${[this.textColor]}-text ${[this.fontSize]} ${[this.backgroundColor]}-bg font-weight-${[this.fontWeight]} ${[this.textTransform]}`;
  }

  ngAfterViewInit(): void {
    this.setLineHeight(this.lineHeight ?? 'unset');
  }

  private setLineHeight(height: number | string) {
    this.renderer.setStyle(this.el.nativeElement, 'lineHeight', `${height}px`);
  }
}
