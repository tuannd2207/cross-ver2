import { Pagination } from '@share/pagination.model';
import { StatusType } from '@share/share-types.model';

export interface Policies {
  id?: number;
  code: string;
  name: string;
  type: string;
  commissionRecipe: string;
  startDate: string | Date;
  endDate: string | Date;
  status: StatusType | string;
}

export interface PoliciesResponse {
  policies: Policies[];
  totalElements: number;
}

export interface PoliciesRequest extends Pagination {
  policyInfo: Policies;
}
