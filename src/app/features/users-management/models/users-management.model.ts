import { StatusEnum } from '@app/app.enum';
import { Pagination } from '@share/pagination.model';

export interface UsersManagement {
  id?: string;
  userCode?: string;
  userLogin?: string;
  fullName?: string;
  userType?: string;
  position?: string;
  department?: string;
  branch?: string;
  area?: string;
  division?: string;
  managerCode?: string;
  managerName?: string;
  status: StatusType;
}

export interface UserRequest extends Pagination {
  userInfo: UsersManagement;
}

export interface UserResponse {
  totalElements: number;
  users: UsersManagement[];
}

export type StatusType = keyof typeof StatusEnum;
