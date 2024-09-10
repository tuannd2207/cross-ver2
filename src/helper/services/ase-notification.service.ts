import { ApplicationRef, ComponentRef, createComponent, EnvironmentInjector, Injectable } from '@angular/core';
import { AseNotificationComponent } from '@share/ase-notification/ase-notification.component';
import { ToastPositionType } from 'primeng/toast/toast.interface';
import { NotificationType } from '@share/share-types.model';

@Injectable({
  providedIn: 'root',
})
export class AseNotificationService {
  private componentRefs: ComponentRef<AseNotificationComponent>[] = [];

  constructor(
    private appRef: ApplicationRef,
    private injector: EnvironmentInjector,
  ) {
  }

  showNotification(
    type: NotificationType,
    message: string,
    position: ToastPositionType = 'top-right',
    duration = 3000,
  ) {
    const componentRef = createComponent(AseNotificationComponent, {
      environmentInjector: this.injector,
    });

    componentRef.instance.type = type;
    componentRef.instance.message = message;
    componentRef.instance.duration = duration;
    componentRef.instance.position = position;
    //
    const domElement = componentRef.location.nativeElement;
    document.body.appendChild(domElement);
    // Append the rendered component content into the container
    this.appRef.attachView(componentRef.hostView);
    this.componentRefs.push(componentRef); // Track the new component
    const toastsEl = document.querySelectorAll<HTMLElement>('.p-toast.p-component');
    Array.from(toastsEl).forEach((item, index) => {
      if (index > 0) {
        const spacingTop = 100 + (70 * index);
        item.style.top = `${spacingTop}px`;
      }
    });
    setTimeout(() => this.removeNotification(componentRef), duration);
  }

  protected removeNotification(componentRef: ComponentRef<AseNotificationComponent>) {
    const index = this.componentRefs.indexOf(componentRef);
    console.log(index);
    if (index !== -1) {
      this.componentRefs.splice(index, 1); // Remove the component reference
      componentRef.destroy();
      this.appRef.detachView(componentRef.hostView);
    }
  }
}
