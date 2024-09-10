import { inject, Injectable } from '@angular/core';
import { ApiService } from '@helper/api.service';
import { IPermissionManagement } from '../models/permissions.model';

@Injectable()
export class PermissionsManagementService {
  private apiService = inject(ApiService);

  getAllParameters() {
    return this.apiService.post<IPermissionManagement[]>({
      authenType: 'getAllSystemParameters',
    });
  }

  getParameter(parameter: IPermissionManagement) {
    return this.apiService.post<IPermissionManagement, number>({
      data: parameter.id,
      authenType: 'getSystemParameter',
    });
  }

  updateSystemParameter(parameter: IPermissionManagement) {
    return this.apiService.post<null, IPermissionManagement>({
      data: parameter,
      authenType: 'updateSystemParameter',
    });
  }

  approveAndRejectSystemParameter(
    parameter: IPermissionManagement,
    state: boolean
  ) {
    return this.apiService.post<
      { action: boolean },
      { id: number; approve: boolean }
    >({
      data: {
        id: parameter.id,
        approve: state,
      },
      authenType: 'approveSystemParameter',
    });
  }

  getSystemParameterNewAndOld(parameter: IPermissionManagement) {
    return this.apiService.post<
      {
        systemParameterOld: IPermissionManagement;
        systemParameterNew: IPermissionManagement;
      },
      number
    >({
      data: parameter.id,
      authenType: 'getSystemParameterNewAndOld',
    });
  }
}
