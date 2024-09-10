import { MenuItem } from 'primeng/api';
import { ActionEventsType } from '@share/share-enum';
import { StatusType } from '@share/share-types.model';

export interface AseEventItem extends MenuItem {
  showIn?: StatusType[];
  modified?: boolean;
  keyMapAction?: string;
  keyMapCondition?: string;
  action?: ActionEventsType;
}
