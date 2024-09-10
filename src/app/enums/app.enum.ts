export enum Lang {
  en = 'en',
  vi = 'vi',
}

export enum ThemeTypeEnum {
  light = 'light',
  dark = 'dark',
}

export enum StatusEnum {
  PENDING = 'PENDING',
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
}

export type STATUS_TYPE = keyof typeof StatusEnum;
