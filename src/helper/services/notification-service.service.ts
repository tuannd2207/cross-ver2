import {ApplicationRef, ComponentRef, createComponent, EnvironmentInjector, Injectable} from '@angular/core';
import {AseNotificationComponent} from "@share/ase-notification/ase-notification.component";

@Injectable({
  providedIn: 'root'
})
export class NotificationServiceService {
  constructor(private injector: EnvironmentInjector, private appRef: ApplicationRef) {}

  createComponent(mess: string): ComponentRef<AseNotificationComponent> {
    // Create the component dynamically
    const componentRef = createComponent(AseNotificationComponent, {
      environmentInjector: this.injector,
    });
    componentRef.instance.mess = mess;
    // Attach the component to the DOM
    const domElement = componentRef.location.nativeElement;
    document.body.appendChild(domElement);

    // Manually tell Angular to run change detection
    this.appRef.attachView(componentRef.hostView);

    return componentRef;
  }

  destroyComponent(componentRef: ComponentRef<any>): void {
    if (componentRef) {
      this.appRef.detachView(componentRef.hostView);
      componentRef.destroy();
    }
  }
}
