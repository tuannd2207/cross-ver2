import {
  AfterContentChecked,
  ChangeDetectorRef,
  Component,
  inject,
} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AsyncPipe, NgIf } from '@angular/common';
import { AseLoadingService } from '@helper/ase-loading.service';
import { NgxPermissionsModule } from 'ngx-permissions';

@Component({
  selector: 'ase-root',
  standalone: true,
  imports: [RouterOutlet, AsyncPipe, NgIf, NgxPermissionsModule],
  providers: [],
  templateUrl: './app.component.html',
})
export class AppComponent implements AfterContentChecked {
  private cdr = inject(ChangeDetectorRef);
  loadingService = inject(AseLoadingService);

  ngAfterContentChecked(): void {
    this.cdr.detectChanges();
  }
}
