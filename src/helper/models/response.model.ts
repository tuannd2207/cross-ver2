export interface ResponseModel<T> {
  header: HeaderModel;
  body: BodyModel<T>;
  error?: ErrorResponse;
}

export interface HeaderModel {
  reqType: string;
  api: string;
  apiKey?: string;
  priority: string;
  channel: string;
  subChannel: string;
  context: string;
  userID?: string;
  synasyn: string;
}

export interface BodyModel<T> {
  status: string;
  authenType: string;
  data: T;
}

export interface ErrorResponse {
  code: string;
  desc: string;
  messageVn: string;
  messageEn: string;
}
