import { FormControl } from '@angular/forms';
import { StatusType } from '@share/share-types.model';

export interface ISystemParameter {
  id: number;
  name: string;
  value: string;
  description: string;
  status: StatusType;
}

export enum SystemParametersActionsEnum {
  EDIT = 'EDIT',
  APPROVE = 'APPROVE',
}

export type SystemParametersActionsType =
  keyof typeof SystemParametersActionsEnum;

export type ParameterForm = {
  [P in keyof Omit<ISystemParameter, 'id' | 'actions'>]: FormControl<
    Omit<ISystemParameter, 'id' | 'actions'>[P]
  >;
};
