export enum RolesEnum {
  I = 'I',
  S = 'S',
  A = 'A',
}

export enum MenuPermissionsEnum {
  SYS_MANAGEMENT = '/SYS_MANAGEMENT',
  SYS_PARAM_OPEN = '/SYS-PARAM-OPEN',
  SYS_PARAM_LIST = '/SYS-PARAM-LIST',
  USER_OPEN = '/USER-OPEN',
  USER_LIST = '/USER-LIST',
  PERMISSIONS_OPEN = '/PERMISSIONS-OPEN',
  PERMISSIONS_LIST = '/PERMISSIONS-LIST',

  OPERATIONS = '/OPERATIONS',
  PARTNER_OPEN = '/PARTNER-OPEN', // => general information
  PARTNER_LIST = '/PARTNER-LIST', // => general information
  POLICY_OPEN = '/POLICY-OPEN',
  POLICY_LIST = '/POLICY-LIST',
  TRANSACTION_LIST = '/TRANSACTION-LIST',
}

export type RolesType = keyof typeof RolesEnum;

export type PermissionsType = keyof typeof MenuPermissionsEnum;

export interface IPermission {
  functionId: MenuPermissionsEnum;
  functionName: string;
  rightIdList: RolesType[];
}

export interface ILdapLoginRes {
  email: string;
  employeeId: string;
  token: string;
  permissionList: IPermission[];
}
