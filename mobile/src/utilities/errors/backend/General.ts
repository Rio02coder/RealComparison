/* istanbul ignore file */
import {BackendError} from '../../../types/service/server';

/**
 * @type D the format of data for which a backend query retrieval failed.
 * @type F the format of data the client would have expected to have after a completely successful query retrieval.
 */
export default abstract class GeneralBackendErrorHandler<D = any, F = any> {
  private error: BackendError<D> | null;

  constructor(error?: BackendError<D>) {
    this.error = error ? error : null;
  }

  public getError(): BackendError<D> | null {
    return this.error;
  }

  public getValidError(): BackendError<D> {
    if (this.error == null)
      throw new Error('There has been no error set into the handler.');
    return this.error;
  }

  public setError(error: BackendError<D>) {
    this.error = error;
  }

  protected cleanError(): void {
    this.error = null;
  }

  /**
   * This method attempts a recovery for the data that that can be used to offer back the one which was asked for in
   * the first place. Implementors of this class are not forced to provide recovery processes. Therefore, by default,
   * when called, this method will reject back the same error it already had to manage of the `BackendError<D>` type.
   * @returns A promise either resolving to the data wanted in the first place or to another error in case of failure.
   */
  public recover(): Promise<F> {
    return new Promise<F>((resolve, reject) => reject(this.getValidError()));
  }

  public abstract getMessage(): string;
}
