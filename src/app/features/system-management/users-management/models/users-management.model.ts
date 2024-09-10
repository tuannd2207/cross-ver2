import { Pagination } from '@share/pagination.model';
import { StatusType } from '@share/share-types.model';

export interface UsersManagement {
  id?: string;
  userCode?: string;
  userLogin?: string;
  fullName?: string;
  userType?: string;
  modified?: boolean;
  position?: string;
  department?: string;
  branch?: string;
  area?: string;
  division?: string;
  directManager?: string;
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

export interface UserComparison {
  userOld?: UsersManagement;
  userNew?: UsersManagement;
}
