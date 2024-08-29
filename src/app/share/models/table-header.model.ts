import { MenuItem } from 'primeng/api';

export interface AseMenuItem<A> extends MenuItem {
  action: A;
}

export interface TableHeader {
  field: string;
  header: string;
  disabledSort?: boolean;
  width?: string;
  background?: boolean;
}
