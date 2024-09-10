import { FormControl } from '@angular/forms';
import { StatusType } from '@share/share-types.model';

export interface IPermissionManagement {
  id: number;
  groupCode: string;
  groupName: string;
  description: string;
  status: StatusType;
}

export enum PermissionManagementActionsEnum {
  EDIT = 'EDIT',
  APPROVE = 'APPROVE',
  VIEW = 'VIEW',
  DELETE = 'DELETE',
}

export type PermissionManagementActionsType =
  keyof typeof PermissionManagementActionsEnum;

export type PermissionManagementForm = {
  [P in keyof Omit<IPermissionManagement, 'actions' | 'id'>]: FormControl<
    Omit<IPermissionManagement, 'actions' | 'id'>[P]
  >;
};
