export interface IMenuItem {
  label?: string;
  permissions?: string[];
  icon?: string;
  items?: IMenuItem[];
  routerLink?: string[];
  separator?: boolean;
}
