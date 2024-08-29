import { StatusType } from '../../users-management/models/users-management.model';
import { FormControl } from '@angular/forms';
import { AseMenuItem } from '@share/table-header.model';

export interface ISystemParameter {
  id: number;
  name: string;
  value: string;
  description: string;
  status: StatusType;
  actions?: AseMenuItem<SystemParametersActionsType>[];
}

export enum SystemParametersActionsEnum {
  EDIT = 'EDIT',
  APPROVE = 'APPROVE',
}

export type SystemParametersActionsType =
  keyof typeof SystemParametersActionsEnum;

export type ParameterForm = {
  [P in keyof ISystemParameter]: FormControl<ISystemParameter[P]>;
};
