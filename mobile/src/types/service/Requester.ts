import {AxiosInstance, AxiosRequestConfig} from 'axios';

export interface FormPath<T = any, D = any, F = void, S = D> {
  api: AxiosInstance;
  responseHandler: (response: T) => F;
  config: AxiosRequestConfig<S>;
  adapter?: (data: D) => S;
}
