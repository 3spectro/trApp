export interface IApiResponse<T> {
  status: number;
  message: string;
  value: T;
}
