/* istanbul ignore file */
import {FormikErrors} from 'formik';
import {
  FormContextErrorHandler,
  FormErrors,
} from '../../../../types/components/forms/FormContext';
import {BackendError} from '../../../../types/service/server';
import ChainErrorHandler from '../ChainErrorHandler';

export default abstract class GeneralBackendFormErrorHandler<
  D = any,
  F = any,
  T = any,
  S = D,
  ND = S,
  NT = any,
  NS = ND,
  NF = any,
> extends ChainErrorHandler<D, D, T, F, S, ND, NT, NS, NF> {
  public abstract getMessages(): FormikErrors<D>;

  public constructor(
    chainErrorHandler: ChainErrorHandler<D, D, T, F, S, ND, NT, NS, NF>,
  ) {
    super(chainErrorHandler, true);
  }

  public setAndMarkErrors(
    error: BackendError<D>,
    setErrors: FormContextErrorHandler<D>,
  ): void {
    this.setError(error);
    this.markErrors(setErrors);
  }

  /**
   * Provide the forms functions of submissions.
   * @param setErrors The method used to set the user errors in the app.
   * @returns A promise silently failing in `null` or resolving to the required data.
   */
  public getFormProcessor(
    setErrors: FormContextErrorHandler<D>,
  ): (form: D, stringified?: boolean) => Promise<F | null> {
    return async (form: D, stringified?: boolean): Promise<F | null> => {
      return new Promise<F | null>((resolve, reject) => {
        this.setRequesterValues(form, stringified);
        this.recover()
          .then(recoveredData => resolve(recoveredData))
          .catch((error: BackendError<D>) => {
            this.setAndMarkErrors(error, setErrors);
            return resolve(null);
          });
      });
    };
  }

  public isErrorGlobal(): boolean {
    return this.getMessages() == {};
  }

  public markErrors(setErrors: FormContextErrorHandler<D>): void {
    if (this.isErrorGlobal()) {
      setErrors({default: this.getMessage()} as FormErrors<D>);
    } else {
      setErrors(this.getMessages());
    }
  }
}
