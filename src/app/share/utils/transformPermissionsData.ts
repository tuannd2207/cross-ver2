import { IPermission, MenuPermissionsEnum } from '@helper/iLdap-login-res';
import { ActionEventsEnum, ActionEventsType } from '@share/share-enum';

export type RolesType = {
  [p in MenuPermissionsEnum]?: ActionEventsType[];
};

export const transformPermissionData = (
  source: IPermission[]
): { roles: RolesType; permissions: MenuPermissionsEnum[] } => {
  const roles: RolesType = {};
  const permissions: MenuPermissionsEnum[] = [];
  for (const p of source) {
    if (
      p.functionId === MenuPermissionsEnum.SYS_PARAM_OPEN ||
      p.functionId === MenuPermissionsEnum.USER_OPEN ||
      p.functionId === MenuPermissionsEnum.PERMISSIONS_OPEN
    )
      permissions.push(MenuPermissionsEnum.SYS_MANAGEMENT);

    if (
      p.functionId === MenuPermissionsEnum.POLICY_OPEN ||
      p.functionId === MenuPermissionsEnum.PARTNER_OPEN ||
      p.functionId === MenuPermissionsEnum.TRANSACTION_LIST
    )
      permissions.push(MenuPermissionsEnum.OPERATIONS);

    permissions.push(p.functionId);
    let childPermission: ActionEventsType[] = [];
    if (p.rightIdList.includes('I'))
      childPermission = [
        ...childPermission,
        ActionEventsEnum.NEW,
        ActionEventsEnum.VIEW,
        ActionEventsEnum.EDIT,
        ActionEventsEnum.DELETE,
      ];
    if (p.rightIdList.includes('A'))
      childPermission = [
        ...childPermission,
        ActionEventsEnum.APPROVE,
        ActionEventsEnum.REJECT,
      ];
    if (p.rightIdList.includes('I'))
      childPermission = [...childPermission, ActionEventsEnum.VIEW];
    roles[p.functionId] = childPermission;
  }

  return { roles, permissions };
};
