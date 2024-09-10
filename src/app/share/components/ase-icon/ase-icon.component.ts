import { Component, inject, Input } from '@angular/core';
import { AsyncPipe, NgIf } from '@angular/common';
import { map, Observable } from 'rxjs';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { HttpClient, HttpContext } from '@angular/common/http';
import { SKIP_LOADING } from '@app/app.constant';

@Component({
  selector: 'ase-icon',
  standalone: true,
  imports: [AsyncPipe, NgIf],
  templateUrl: './ase-icon.component.html',
})
export class AseIconComponent {
  svgIcon$!: Observable<SafeHtml>;
  private httpClient = inject(HttpClient);
  private sanitizer = inject(DomSanitizer);

  @Input({ required: true })
  set iconName(name: string) {
    name
      ? (this.svgIcon$ = this.httpClient
          .get(`assets/icons/${name}.svg`, {
            responseType: 'text',
            context: new HttpContext().set(SKIP_LOADING, true),
          })
          .pipe(map((value) => this.sanitizer.bypassSecurityTrustHtml(value))))
      : void 0;
  }
}
