type Roles = 'INTERNAL' | 'PARTNER';
type Permission = string[];

export interface IMenuItem {
  label?: string;
  permissions?: { [p in Roles]: Permission };
  icon?: string;
  items?: IMenuItem[];
  routerLink?: string[];
  separator?: boolean;
}
