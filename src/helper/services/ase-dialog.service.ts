import { ApplicationRef, ComponentRef, createComponent, EnvironmentInjector, Injectable } from '@angular/core';
import { AseConfirmDialogComponent } from '@share/ase-confirm-dialog/ase-confirm-dialog.component';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AseDialogService {

  private componentRef: ComponentRef<AseConfirmDialogComponent> | null = null;
  afterClose$: Subject<unknown> = new BehaviorSubject<unknown>(undefined);

  constructor(
    private appRef: ApplicationRef,
    private injector: EnvironmentInjector,
  ) {
  }

  openDialog() {
    if (!this.componentRef) {
      this.componentRef = createComponent(
        AseConfirmDialogComponent, {
          environmentInjector: this.injector,
        },
      );
      this.componentRef.instance.visible = true;
      this.componentRef.instance.headerTitle = 'true';
      this.componentRef.instance.doCancel.subscribe({
        next: (res: boolean) => {
          res === false ? this.removeDialog() : void (0);
          this.afterClose$.next('sdsdsdsdsds');
          this.removeDialog();
        },
      });
      const domElement = this.componentRef.location.nativeElement;
      document.body.appendChild(domElement);
      this.appRef.attachView(this.componentRef.hostView);
    }
  }

  protected removeDialog() {
    if (this.componentRef) {
      this.appRef.detachView(this.componentRef.hostView);
      this.componentRef.destroy();
      this.componentRef = null;
      setTimeout(() => {
        this.afterClose$.complete();
      }, 1000);
    }
  }
}
