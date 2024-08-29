import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, Observable, tap } from 'rxjs';
import { BodyModel, ResponseModel } from '@helper/response.model';
import { RequestModel } from '@helper/request.model';
import { BODY_REQUEST } from '@app/app.constant';
import { environment } from '@environments/environment';
import { RequestFeApiModel } from '@helper/request-fe-api.model';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private readonly http = inject(HttpClient);

  get headers(): HttpHeaders {
    const headersConfig = {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    };
    return new HttpHeaders(headersConfig);
  }

  authFetch<T>(
    url: string,
    bodyRequest: { username: string; password: string }
  ): Observable<BodyModel<T>> {
    const requestBody: RequestModel<typeof BODY_REQUEST.LOGIN> = {
      header: environment.headerFeApi,
      body: {
        command: BODY_REQUEST.LOGIN.command,
        data: {
          authenType: BODY_REQUEST.LOGIN.data.authenType,
          username: bodyRequest.username,
          password: bodyRequest.password,
        },
      },
    };
    return this.http
      .post<ResponseModel<T>>(url, requestBody, {
        headers: this.headers,
      })
      .pipe(
        tap({
          next: (content) => {
            if (content.error) throw content.error;
          },
        }),
        map((res) => res.body)
      );
  }

  post<T, D>(
    requestBody: RequestFeApiModel<D>,
    url: string = environment.feApiUrl
  ): Observable<BodyModel<T>> {
    const requestAPI: RequestModel<typeof BODY_REQUEST.BODY_REQUEST_FE_API> = {
      header: environment.headerFeApi,
      body: {
        authenType: requestBody.authenType,
        data: <D>requestBody.data,
      },
    };
    return this.http
      .post<ResponseModel<T>>(url, requestAPI, {
        headers: this.headers,
      })
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
