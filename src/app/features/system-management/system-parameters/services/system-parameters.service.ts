import { inject, Injectable } from '@angular/core';
import { ApiService } from '@helper/api.service';
import { ISystemParameter } from '../models/system-parameters.model';

interface IAllParametersFilters {
  searchName?: string;
  searchValue?: string;
  searchDescription?: string;
  searchStatus?: string;
}

@Injectable()
export class SystemParametersService {
  private apiService = inject(ApiService);

  getAllParameters(filters?: IAllParametersFilters) {
    return this.apiService.post<ISystemParameter[], IAllParametersFilters>({
      authenType: 'getAllSystemParameters',
      data: {
        searchName: filters?.searchName ?? '',
        searchValue: filters?.searchValue ?? '',
        searchDescription: filters?.searchDescription ?? '',
        searchStatus: filters?.searchStatus ?? '',
      },
    });
  }

  getParameter(parameter: ISystemParameter) {
    return this.apiService.post<ISystemParameter, number>({
      data: parameter.id,
      authenType: 'getSystemParameter',
    });
  }

  updateSystemParameter(parameter: ISystemParameter) {
    return this.apiService.post<
      null,
      Omit<ISystemParameter, 'description' | 'actions' | 'name'>
    >({
      data: {
        status: parameter.status,
        id: parameter.id,
        value: parameter.value,
      },
      authenType: 'updateSystemParameter',
    });
  }

  approveOrRejectSystemParameter(parameter: ISystemParameter, state: boolean) {
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

  getSystemParameterNewAndOld(parameter: ISystemParameter) {
    return this.apiService.post<
      {
        systemParameterOld: ISystemParameter;
        systemParameterNew: ISystemParameter;
      },
      number
    >({
      data: parameter.id,
      authenType: 'getSystemParameterNewAndOld',
    });
  }
}
