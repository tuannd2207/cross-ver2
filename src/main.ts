import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { appConfig } from './app/app.config';
import { isDevMode } from '@angular/core';

async function prepareApp() {
  if (
    isDevMode() &&
    Boolean(JSON.parse(localStorage.getItem('enableMock') ?? 'false'))
  ) {
    const { worker } = await import('mock/browser');
    return worker.start();
  }

  return Promise.resolve();
}

prepareApp().then(() => {
  bootstrapApplication(AppComponent, appConfig).catch((err) =>
    console.error(err)
  );
});
