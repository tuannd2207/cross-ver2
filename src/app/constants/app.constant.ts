import { environment } from '@environments/environment.development';
import { RequestFeApiModel } from '@helper/request-fe-api.model';
import { StatusEnum } from '@app/app.enum';
import { TypeUserEnum } from '@share/share-enum';
import { HttpContextToken } from '@angular/common/http';
import { SelectOption } from '@share/select-option.model';
import TRANSLATION_PATH from '@app/translation-paths.enum';

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

export const STATUS_OPTIONS: SelectOption[] = [
  {
    label: `${TRANSLATION_PATH.COMMON}${StatusEnum.ACTIVE}`,
    value: StatusEnum.ACTIVE,
  },
  {
    label: `${TRANSLATION_PATH.COMMON}${StatusEnum.INACTIVE}`,
    value: StatusEnum.INACTIVE,
  },
];

export const TYPES_USER: SelectOption[] = [
  {
    label: `${TRANSLATION_PATH.COMMON}${TypeUserEnum.INTERNAL}`,
    value: TypeUserEnum.INTERNAL,
  },
  {
    label: `${TRANSLATION_PATH.COMMON}${TypeUserEnum.EXTERNAL}`,
    value: TypeUserEnum.EXTERNAL,
  },
];

export const SKIP_LOADING = new HttpContextToken<boolean>(() => true);
