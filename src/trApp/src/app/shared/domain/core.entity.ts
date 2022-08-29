export interface IApiResponse<T> {
  status: number;
  message?: IFieldMessage;
  value: T;
}

export interface IGenericResponse<T> {
  status: boolean;
  message?: IFieldMessage;
  value: T;
}

export interface IFieldMessage {
  field: string;
  message: string;
}
