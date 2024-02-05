import {BackendError} from '../../../service/server';

type ErrorMapper<D = any, S = D> = (
  receivedErrors: BackendError<S>,
) => BackendError<D>;

export default ErrorMapper;
