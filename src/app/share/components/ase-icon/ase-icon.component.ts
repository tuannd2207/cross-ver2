import { Component, inject, Input } from '@angular/core';
import { AsyncPipe, NgIf } from '@angular/common';
import { map, Observable } from 'rxjs';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'ase-icon',
  standalone: true,
  imports: [AsyncPipe, NgIf],
  templateUrl: './ase-icon.component.html',
})
export class AseIconComponent {
  // @ViewChild('iconRef', { static: true }) iconRef!: ElementRef;
  // @Input() iconName = '';
  // @Input() width = 24;
  // @Input() height = 24;
  // private renderer = inject(Renderer2);
  //
  // ngAfterViewInit(): void {
  //   this.renderer.setStyle(
  //     this.iconRef.nativeElement,
  //     'width',
  //     `${this.width}px`
  //   );
  //   this.renderer.setStyle(
  //     this.iconRef.nativeElement,
  //     'height',
  //     `${this.height}px`
  //   );
  // }
  svgIcon$!: Observable<SafeHtml>;
  private httpClient = inject(HttpClient);
  private sanitizer = inject(DomSanitizer);

  @Input()
  set iconName(name: string) {
    name
      ? (this.svgIcon$ = this.httpClient
          .get(`assets/icons/${name}.svg`, { responseType: 'text' })
          .pipe(map((value) => this.sanitizer.bypassSecurityTrustHtml(value))))
      : void 0;
  }
}
