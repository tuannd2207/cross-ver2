import {Component, inject} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {ToastModule} from 'primeng/toast';
import {AsyncPipe, NgIf} from "@angular/common";
import {AseLoadingService} from "@helper/ase-loading.service";

@Component({
  selector: 'ase-root',
  standalone: true,
  imports: [RouterOutlet, ToastModule, AsyncPipe, NgIf],
  templateUrl: './app.component.html',
})
export class AppComponent {
  loadingService = inject(AseLoadingService);
  loading$ = this.loadingService.loading$;
}
