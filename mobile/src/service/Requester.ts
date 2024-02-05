/* istanbul ignore file */
import {AxiosRequestConfig, AxiosResponse} from 'axios';
import {FormPath} from '../types/service/Requester';
import {BackendError} from '../types/service/server';
import ErrorMapper from '../types/utilities/errors/backend/ErrorMapper';
import GeneralBackendErrorHandler from '../utilities/errors/backend/General';
import Dependency from './Dependency';

/**
 * @type D The raw data to be processed for the future request to be made.
 * @type T The raw answer the server will give in case of a successful request.
 * @type F The processed data after reasoning over `T` used for final recovery resolution.
 * @type S The format in which the data will be in fact sent to the server as (translated from `D`).
 */
export default class Requester<D = any, T = any, F = any, S = D> {
  private values: D | undefined;
  private path: FormPath<T, D, F, S>;
  private dependency?: Dependency<any, D, S>;

  constructor(
    path: FormPath<T, D, F, S>,
    values?: D,
    dependency?: Dependency<any, D, S>,
  ) {
    this.values = values;
    this.path = path;
    this.dependency = dependency;
  }

  public getDependency() {
    return this.dependency;
  }

  public setDependency(dependency: Dependency<any, D, S>) {
    this.dependency = dependency;
  }

  public setValues(values: D) {
    this.values = values;
  }

  public getValues(): D | undefined {
    return this.values;
  }

  public setPath(path: FormPath<T, D, F, S>) {
    this.path = path;
  }

  public getPath(): FormPath<T, D, F, S> {
    return this.path;
  }

  public updateAPI(additionalAPIConfig: AxiosRequestConfig) {
    this.path.config = {...this.path.config, ...additionalAPIConfig};
  }

  private getPreparedBackendCallConfig(form?: D): AxiosRequestConfig<S> {
    const path = this.path;
    const adaptedForm = form
      ? ((path.adapter ? path.adapter(form) : form) as S)
      : undefined;
    const unpreparedBackendCallConfig = path.config;
    switch (unpreparedBackendCallConfig.method) {
      case undefined:
        throw new Error('Form method must be specified!');
      case 'POST':
      case 'post':
      case 'PATCH':
      case 'patch':
        return {...unpreparedBackendCallConfig, data: adaptedForm};
      default:
        return {...unpreparedBackendCallConfig, params: adaptedForm};
    }
  }

  private defaultQuery(form?: D): Promise<AxiosResponse<T, S>> {
    return this.path.api(this.getPreparedBackendCallConfig(form));
  }

  /**
   * Having multiple chained error handlers, force a retrieval of a valid answer. This time, if the call fails, an
   * `BackendError<D>` error will be rejected instead of a `BackendError<S>` one.
   */
  public forceQuery(
    errorHandler: GeneralBackendErrorHandler<D, F>,
    errorMapper: ErrorMapper<D, S> = errors =>
      errors as unknown as BackendError<D>,
  ): Promise<F> {
    return new Promise<F>((resolve, reject) => {
      this.query()
        .then(axiosResponse => resolve(axiosResponse))
        .catch((err: BackendError<S>) => {
          errorHandler.setError(errorMapper(err));
          errorHandler
            .recover()
            .then(recoveredData => resolve(recoveredData))
            .catch((error: BackendError<D>) => reject(error));
        });
    });
  }

  public hasDependency() {
    return this.dependency !== undefined;
  }

  /**
   * If a dependency has been set into this requester, it will firstly be fetched as
   * instructed, so the job of this requester can be fulfilled.
   */
  private async satisfyDependency() {
    if (!this.hasDependency()) {
      return;
    }
    const dependencyNeededStartingValues =
      this.dependency?.needsStartingValues() ? this.values : undefined;
    this.values = await this.dependency?.satisfy(
      dependencyNeededStartingValues,
    );
  }

  /**
   * @returns A promise resolving to the finally desired data from the backend in the case of a successful
   *          call. If this call is a failure, an `BackendError<S>` will get rejected instead.
   */
  public query(): Promise<F> {
    return new Promise<F>(async (resolve, reject) => {
      try {
        await this.satisfyDependency();
        const rawResponse = await this.defaultQuery(this.values);
        resolve(this.path.responseHandler(rawResponse.data));
      } catch (error) {
        console.error({error});
        reject(error as BackendError<S>);
      }
    });
  }
}
