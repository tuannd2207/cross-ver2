import { inject, Injectable } from '@angular/core';
import { ApiService } from '@helper/api.service';
import { environment } from '@environments/environment';
import { Observable } from 'rxjs';
import { ILdapLoginRes } from '@helper/iLdap-login-res';
import { BodyModel } from '@helper/response.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiService = inject(ApiService);
  private apiUrl = environment.ldapLoginUrl;

  login(
    username: string,
    password: string
  ): Observable<BodyModel<ILdapLoginRes>> {
    return this.apiService.authFetch<ILdapLoginRes>(this.apiUrl, {
      username: username,
      password: password,
    });
  }
}
