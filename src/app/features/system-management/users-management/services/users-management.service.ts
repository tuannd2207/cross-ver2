import { inject, Injectable } from '@angular/core';
import { ApiService } from '@helper/api.service';
import { Observable } from 'rxjs';
import { BodyModel } from '@helper/response.model';
import {
  UserComparison,
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
      {
        url: this.loadUrl('getUsersByPage'),
      }
    );
  }

  addUser(user: UsersManagement): Observable<BodyModel<UsersManagement>> {
    return this.apiService.post(
      {
        data: user,
        authenType: 'addUser',
      },
      {
        url: this.loadUrl('addUser'),
      }
    );
  }

  findUserById(id: string): Observable<BodyModel<UsersManagement>> {
    return this.apiService.post(
      {
        data: id,
        authenType: 'getUserById',
      },
      {
        url: this.loadUrl('getUserById'),
      }
    );
  }

  loadAllUSerAsManager(): Observable<BodyModel<ManagerList[]>> {
    return this.apiService.post(
      {
        data: {},
        authenType: 'getAllUsersByStatusActive',
      },
      { url: this.loadUrl('getAllUsersByStatusActive') }
    );
  }

  getInfoApproveUser(id: string): Observable<BodyModel<UserComparison>> {
    return this.apiService.post(
      {
        data: id,
        authenType: 'getUserNewAndOld',
      },
      {
        url: this.loadUrl('getUserNewAndOld'),
      }
    );
  }

  approveOrRejectUser(request: {
    id: string;
    approve: boolean;
  }): Observable<BodyModel<UserComparison>> {
    return this.apiService.post(
      {
        data: {
          id: request.id,
          approve: request.approve,
        },
        authenType: 'approveOrRejectSystemParameter',
      },
      {
        url: this.loadUrl('approveOrRejectSystemParameter'),
      }
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
      { url: this.loadUrl('importUser') }
    );
  }

  private loadUrl(url = ''): string {
    const isEnableMock = Boolean(
      JSON.parse(localStorage.getItem('enableMock') ?? 'false')
    );
    console.log(isEnableMock);
    return isEnableMock ? `${this.apiUrl}/${url}` : this.apiUrl;
  }
}
