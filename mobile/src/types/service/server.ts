import {AxiosError, AxiosResponse} from 'axios';
import {SessionTokens} from '../utilities/storage/Session';

interface BackendErrorData {
  message: string;
  description: string;
}

interface BackendErrorResponse<D> extends AxiosResponse<BackendErrorData, D> {
  data: BackendErrorData;
}

export interface BackendError<D> extends AxiosError<BackendErrorData, D> {
  response: BackendErrorResponse<D>;
}

export interface PasswordlessUserBackend {
  token?: SessionTokens;
  user: {
    first_name: string;
    last_name: string;
    phone_number?: string;
    email: string;
    service: string;
  };
}

export interface UserBackend extends PasswordlessUserBackend {
  user: PasswordlessUserBackend['user'] & {
    password: string;
  };
}
