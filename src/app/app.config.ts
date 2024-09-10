import { ApplicationConfig, importProvidersFrom, provideZoneChangeDetection } from '@angular/core';
import { PreloadAllModules, provideRouter, withPreloading } from '@angular/router';

import { routes } from './app.routes';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { HTTP_INTERCEPTORS, HttpClient, HttpClientModule } from '@angular/common/http';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AuthInterceptor } from '@helper/auth.interceptor';
import { NgxPermissionsModule } from 'ngx-permissions';

// function ngxPermissionsFactory(
//   authService: AuthService,
//   rolesService: NgxRolesService,
//   perService: NgxPermissionsService
// ): () => Promise<null> {
//   return () =>
//     new Promise<null>((res) => {
//       authService.authorize().subscribe((d) => {
//         const { roles, permissions } = transformPermissionData(
//           d.data.permissionList
//         );
//         rolesService.addRoles(roles);
//         perService.addPermission(permissions);
//         res(null);
//       });
//     });
// }
export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes, withPreloading(PreloadAllModules)),
    importProvidersFrom(
      BrowserAnimationsModule,
      HttpClientModule,
      TranslateModule.forRoot({
        loader: {
          provide: TranslateLoader,
          useFactory: (http: HttpClient) => new TranslateHttpLoader(http),
          deps: [HttpClient],
        },
      }),
      NgxPermissionsModule.forRoot()
    ),
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    // {
    //   provide: APP_INITIALIZER,
    //   useFactory: ngxPermissionsFactory,
    //   deps: [AuthService, NgxRolesService, NgxPermissionsService],
    //   multi: true,
    // },
  ],
};
