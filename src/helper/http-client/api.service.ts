import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpContext, HttpHeaders } from '@angular/common/http';
import { map, Observable, tap } from 'rxjs';
import { BodyModel, ResponseModel } from '@helper/response.model';
import { RequestModel } from '@helper/request.model';
import { BODY_REQUEST, SKIP_LOADING } from '@app/app.constant';
import { environment } from '@environments/environment';
import { RequestFeApiModel } from '@helper/request-fe-api.model';
import { transformPermissionData } from '../../app/share/utils/transformPermissionsData';
import { LocalStorageJwtService } from '@helper/local-storage-jwt.service';
import { NgxPermissionsService, NgxRolesService } from 'ngx-permissions';
import { ILdapLoginRes } from '@helper/iLdap-login-res';

interface PostOptions {
  skipLoading?: boolean;
  url?: string;
}

interface IBodyLoginModel {
  command: string;
  data: {
    authenType: string;
    username?: string;
    password?: string;
  };
}

interface IBodyPostModel<D> {
  authenType: string;
  data?: D;
}

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private readonly http = inject(HttpClient);
  private localStorageService = inject(LocalStorageJwtService);
  private permissionsService = inject(NgxPermissionsService);
  private rolesService = inject(NgxRolesService);

  get headers(): HttpHeaders {
    const headersConfig = {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    };
    return new HttpHeaders(headersConfig);
  }

  authFetch(
    url: string,
    bodyRequest?: { username: string; password: string }
  ): Observable<BodyModel<ILdapLoginRes>> {
    const requestBody: RequestModel<IBodyLoginModel> = {
      header: environment.headerFeApi,
      body: {
        command: BODY_REQUEST.LOGIN.command,
        data: {
          authenType: BODY_REQUEST.LOGIN.data.authenType,
          ...bodyRequest,
        },
      },
    };
    return this.http
      .post<ResponseModel<ILdapLoginRes>>(url, requestBody, {
        headers: this.headers,
      })
      .pipe(
        tap({
          next: (content) => {
            if (content.error) throw content.error;
            this.localStorageService.setItem(content.body.data.token);
            const { roles, permissions } = transformPermissionData(
              content.body.data.permissionList
            );
            this.permissionsService.addPermission(permissions);
            this.rolesService.addRoles(roles);
          },
        }),
        map((res) => res.body)
      );
  }

  /**
   * @typeParam T: Type of response data
   * @typeParam D: Type of body data
   */
  post<T, D = undefined>(
    requestBody: RequestFeApiModel<D>,
    options?: PostOptions
  ): Observable<BodyModel<T>> {
    const requestAPI: RequestModel<IBodyPostModel<D>> = {
      header: environment.headerFeApi,
      body: {
        authenType: requestBody.authenType,
        data: requestBody.data,
      },
    };
    return this.http
      .post<ResponseModel<T>>(
        options?.url ?? environment.feApiUrl,
        requestAPI,
        {
          headers: this.headers,
          context: new HttpContext().set(
            SKIP_LOADING,
            options?.skipLoading ?? false
          ),
        }
      )
      .pipe(
        tap({
          next: (content) => {
            if (content.error) throw content.error;
          },
        }),
        map((res) => res.body)
      );
  }
}
