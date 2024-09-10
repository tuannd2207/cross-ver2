import { StatusEnum } from '@app/app.enum';
import { ActionEventsEnum } from '@share/share-enum';

export type ActionEvent = keyof typeof ActionEventsEnum;

export type NotificationType = 'info' | 'warning' | 'error' | 'success';
export type StatusType = keyof typeof StatusEnum;
