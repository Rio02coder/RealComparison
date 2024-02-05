/* istanbul ignore file */
import {FormPath} from '../../../types/service/Requester';
import Requester from '../../../service/Requester';
import SessionConcreteChainErrorHandler from './SessionChainErrorHandler';
import getUserUpdatingSlice from '../../storage/ReduxTokenizer';
import ReduxProps from '../../../types/redux/props';
import {Method} from 'axios';
import {backend} from '../../../service/server';
import ReduxSliceUpdater, {
  ReduxSliceManager,
} from '../../../types/redux/SliceUpdater';

export type ResponseHandler<T, F> = (response: T) => F;
type OptionalResponseHandler<T, F> = ResponseHandler<T, F> | undefined;

export default class SessionManager<D = any, T = any, F = void, P = any> {
  private url: string;
  private data: D;
  private method: Method;
  private responseHandler: ResponseHandler<T, F>;
  private props: ReduxProps;
  private updateReduxSlice?: ReturnType<ReduxSliceUpdater<T>>;

  constructor(
    data: D,
    url: string,
    method: Method,
    props: ReduxProps,
    responseHandler: F extends void
      ? OptionalResponseHandler<T, F>
      : ResponseHandler<T, F>,
    reduxSliceManager?: ReduxSliceManager<P, T>,
  ) {
    this.url = url;
    this.data = data;
    this.method = method;
    this.responseHandler = responseHandler
      ? responseHandler
      : ((() => {}) as unknown as ResponseHandler<T, F>);
    this.props = props;
    this.createUpdateReduxSlice(reduxSliceManager);
  }

  private createUpdateReduxSlice(reduxSliceManager?: ReduxSliceManager<P, T>) {
    if (!reduxSliceManager) {
      return;
    }
    this.updateReduxSlice = response =>
      reduxSliceManager.update(this.props)(reduxSliceManager.adapt(response));
  }

  private getFormPath(): FormPath<T, D, F, D> {
    return {
      api: backend(),
      config: {
        url: this.url,
        method: this.method,
      },
      responseHandler: response => {
        if (this.updateReduxSlice) {
          this.updateReduxSlice(response);
        }
        return this.responseHandler(response);
      },
    };
  }

  public query() {
    return new SessionConcreteChainErrorHandler<D, D, T, F>(
      getUserUpdatingSlice(this.props),
      new Requester<D, T, F, D>(this.getFormPath(), this.data),
    ).recover();
  }
}
