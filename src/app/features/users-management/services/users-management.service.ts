import { inject, Injectable } from '@angular/core';
import { ApiService } from '@helper/api.service';
import { Observable } from 'rxjs';
import { BodyModel } from '@helper/response.model';
import {
  UserRequest,
  UserResponse,
  UsersManagement,
} from '../models/users-management.model';
import { environment } from '@environments/environment';
import { ManagerList } from '../models/manager-list.model';

@Injectable()
export class UsersManagementService {
  private apiService = inject(ApiService);
  apiUrl = environment.feApiUrl;

  loadAllUsers(user?: UserRequest): Observable<BodyModel<UserResponse>> {
    return this.apiService.post(
      {
        data: user,
        authenType: 'getUsersByPage',
      },
      this.loadUrl('getUsersByPage')
    );
  }

  addUser(user: UsersManagement): Observable<BodyModel<UsersManagement>> {
    return this.apiService.post(
      {
        data: user,
        authenType: 'addUser',
      },
      this.loadUrl('addUser')
    );
  }

  findUserById(id: string): Observable<BodyModel<UsersManagement>> {
    return this.apiService.post(
      {
        data: id,
        authenType: 'getUserById',
      },
      this.loadUrl('getUserById')
    );
  }

  loadAllUSerAsManager(): Observable<BodyModel<ManagerList[]>> {
    return this.apiService.post(
      {
        data: {},
        authenType: 'getAllUsersByStatusActive',
      },
      this.loadUrl('getAllUsersByStatusActive')
    );
  }

  importUSer(
    users: UsersManagement[]
  ): Observable<BodyModel<UsersManagement[]>> {
    return this.apiService.post(
      {
        data: users,
        authenType: 'importUser',
      },
      this.loadUrl('importUser')
    );
  }

  private loadUrl(url = ''): string {
    const isEnableMock = Boolean(
      JSON.parse(localStorage.getItem('enableMock') ?? 'false')
    );
    return isEnableMock ? `${this.apiUrl}/${url}` : this.apiUrl;
  }
}
