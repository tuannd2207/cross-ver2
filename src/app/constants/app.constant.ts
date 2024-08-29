import { environment } from '@environments/environment.development';
import { RequestFeApiModel } from '@helper/request-fe-api.model';
import { StatusEnum } from '@app/app.enum';
import { TypeUserEnum } from '@share/share-enum';

export const APP_INFO = {
  APP_ID: environment.appId,
  X_IBM_CLIENT_ID: environment.xIbmClientId,
  X_IBM_CLIENT_SECRET: environment.xIbmClientSecret,
};
export const COMMAND = {
  GET_ENQUIRY: 'GET_ENQUIRY',
  GET_TRANSACTION: 'GET_TRANSACTION',
};

export const BODY_REQUEST = {
  LOGIN: {
    command: COMMAND.GET_ENQUIRY,
    data: {
      authenType: 'getLogin',
      username: '',
      password: '',
    },
  },
  BODY_REQUEST_FE_API: {} as RequestFeApiModel<unknown>,
};

export const STATUS_ITEMS: StatusEnum[] = [
  StatusEnum.ACTIVE,
  StatusEnum.PENDING,
  StatusEnum.INACTIVE,
];

export const TYPES_USER = [TypeUserEnum.INTERNAL, TypeUserEnum.EXTERNAL];
