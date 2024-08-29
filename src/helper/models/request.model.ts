import { HeaderModel } from './response.model';

export interface RequestModel<T> {
  header: HeaderModel;
  body: T;
}
