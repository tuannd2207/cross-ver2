import { IPermissionManagement } from '../models/permissions.model';
import { fakeArray, getStatus } from '../../../../share/utils/common';

const permissionManagementData: IPermissionManagement[] = fakeArray(8).map(
  (_, i) =>
    ({
      id: i,
      status: getStatus(i),
      groupCode: i.toString(),
      groupName: 'permission management' + i,
      description: 'test permission management' + i,
    }) as IPermissionManagement
);

export default permissionManagementData;
