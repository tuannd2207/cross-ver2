import { ActionEventsEnum, TypeControlsEnum } from '@share/share-enum';

export type ActionEvent = keyof typeof ActionEventsEnum;

export type ControlType =
  | TypeControlsEnum.INPUT
  | TypeControlsEnum.DROP_DOWN
  | TypeControlsEnum.RADIO_BUTTON
  | TypeControlsEnum.CHECK_BOX
  | TypeControlsEnum.DATE_PICKER;
