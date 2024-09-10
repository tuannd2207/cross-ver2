import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import {
  catchError,
  finalize,
  map,
  Observable,
  retry,
  throwError,
  timer,
} from 'rxjs';
import { LocalStorageJwtService } from '@helper/local-storage-jwt.service';
import { Router } from '@angular/router';
import { APP_INFO, SKIP_LOADING } from '@app/app.constant';
import { AseLoadingService } from '@helper/ase-loading.service';
import { AseDialogService } from '@helper/ase-dialog.service';

const DELAY_TIME = 5000;
const MAX_RETRY = 3;

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  private localstorageService = inject(LocalStorageJwtService);
  private loadingService = inject(AseLoadingService);
  private dialogService = inject(AseDialogService);
  private readonly router = inject(Router);

  intercept(
    req: HttpRequest<unknown>,
    next: HttpHandler,
  ): Observable<HttpEvent<unknown>> {
    if (!req.context.get(SKIP_LOADING)) {
      this.loadingService.loadingOn();
    }
    let authToken: string | null = '';
    const isLoginRoute = inject(Router).url === '/auth/login';
    this.localstorageService
      .getItem()
      .subscribe((token) => (authToken = token));
    if (authToken && !isLoginRoute) {
      req = this.addToken(req, authToken);
    }
    return next.handle(req).pipe(
      map((res) => res),
      retry({ count: MAX_RETRY, delay: this.retryWhen }),
      catchError((error) => {
        if (error instanceof HttpErrorResponse) {
          switch (error.status) {
            case 401:
              this.router.navigateByUrl('/auth/login');
              break;
            case 404:
              this.router.navigateByUrl('/not-found');
              break;
            case 400:
              this.dialogService.openDialog();
              this.router.navigateByUrl('/error');
              break;
            case 403:
              this.router.navigateByUrl('/forbidden');
              break;
            case 500:
              this.router.navigateByUrl('/error');
              break;
            default:
              throwError(() => error);
              break;
          }
        }
        return throwError(() => error);
      }),
      finalize(() => {
        this.loadingService.loadingOff();
      }),
    );
  }

  private addToken(request: HttpRequest<unknown>, token: string | null) {
    return request.clone({
      setHeaders: {
        'X-IBM-Client-Id': APP_INFO.X_IBM_CLIENT_ID,
        'X-IBM-Client-Secret': APP_INFO.X_IBM_CLIENT_SECRET,
        Authorization: `Bearer ${token}`,
      },
    });
  }

  private retryWhen(error: HttpErrorResponse): Observable<unknown> {
    return error.status === 500 ? timer(DELAY_TIME) : throwError(() => error);
  }
}
