export enum ActionEventsEnum {
  NEW = 'NEW',
  DELETE = 'DELETE',
  APPROVE = 'APPROVE',
  EDIT = 'EDIT',
  VIEW = 'VIEW',
  REJECT = 'REJECT',
}

export type ActionEventsType = keyof typeof ActionEventsEnum;

export enum TypeControlsEnum {
  INPUT = 'INPUT',
  TEXT_AREA = 'TEXT_AREA',
  DROP_DOWN = 'DROP_DOWN',
  DROP_DOWN_ASYNC = 'DROP_DOWN_ASYNC',
  RADIO_BUTTON = 'RADIO_BUTTON',
  CHECK_BOX = 'CHECK_BOX',
  DATE_PICKER = 'DATE_PICKER',
}

export type ControlType = keyof typeof TypeControlsEnum;

export enum TypeUserEnum {
  INTERNAL = 'INTERNAL',
  EXTERNAL = 'EXTERNAL',
}

export enum PolicyTypeEnum {
  OPENACCOUNT = 'OPENACCOUNT',
  TRANSACTIONFEE = 'TRANSACTIONFEE',
  OUTSTANDINGDEBT = 'OUTSTANDINGDEBT',
}

export enum CommissionTypeEnum {
  VALUE = 'VALUE',
  PROPORTION = 'PROPORTION',
}

export enum AccountTypeEnum {
  ACTIVE = 'ACTIVE ',
  NEW = 'NEW ',
  ALL = 'ALL ',
}

export enum YesNoTypeEnum {
  YES = 'YES ',
  NO = 'NO ',
}

export enum preferentialAccountTypeEnum {
  NEW = 'NEW',
  NONE = 'NONE',
}

export enum UserModifyTypeEnum {
  CREATE = 'CREATE',
  UPDATE = 'UPDATE',
}
