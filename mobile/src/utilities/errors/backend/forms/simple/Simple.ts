/* istanbul ignore file */
import {
  FormContextErrorHandler,
  FormErrors,
} from '../../../../../types/components/forms/FormContext';
import {BackendError} from '../../../../../types/service/server';
import {ErrorsMap} from '../../../../../types/utilities/errors/backend/ChainErrorHandler';
import GeneralBackendFormErrorHandler from '../General';
import Requester from '../../../../../service/Requester';
import ChainErrorHandler from '../../ChainErrorHandler';

export default abstract class SimpleFormErrorHandler<
  D = any,
  F = any,
  T = any,
  S = D,
  ND = S,
  NT = any,
  NS = ND,
  NF = any,
> extends GeneralBackendFormErrorHandler<D, F, T, S, ND, NT, NS, NF> {
  private burstInterval: number;
  // eslint-disable-next-line no-undef
  private plannedBurst: NodeJS.Timeout | null;

  /**
   * @param burstInterval How many seconds the error displaying burst will last.
   *                      It takes about 6 seconds to say "This is an example error"
   *                      for 3 times in a row with loud voice.
   */
  constructor(
    requester: Requester<D, T, F, S>,
    error?: BackendError<D>,
    furtherHandlers?: ErrorsMap<S, ND, NT, NF, NS>,
    burstInterval: number = 6,
  ) {
    super(new ChainErrorHandler(requester, error, furtherHandlers));
    this.burstInterval = burstInterval;
    this.plannedBurst = null;
  }

  public getBurst(): number {
    return this.burstInterval * 1000;
  }

  /**
   * Execute this procedure to clear the currently displayed error.
   */
  private closeBurst(setErrors: FormContextErrorHandler<{}>): void {
    this.cleanError();
    if (this.hasBurstBeenCancelled()) {
      return;
    }
    setErrors({});
    this.cancelBurst();
  }

  private hasBurstBeenCancelled(): boolean {
    return this.plannedBurst === null;
  }

  /**
   * Make sure the future planned burst will be discarded.
   */
  public cancelBurst(): void {
    if (this.plannedBurst === null) {
      return;
    }
    clearTimeout(this.plannedBurst);
    this.plannedBurst = null;
  }

  /**
   * Simple forms only have bursts of errors, meaning they are being
   * shown for small time intervals only.
   */
  private planBurst(setErrors: FormContextErrorHandler<{}>): void {
    this.plannedBurst = setTimeout(
      () => this.closeBurst(setErrors),
      this.getBurst(),
    );
  }

  /**
   * There is only one error field to handle: `default`.
   */
  public getFormProcessor(
    setErrors: FormContextErrorHandler<{}>,
  ): (form: D) => Promise<F | null> {
    const formProcessor = super.getFormProcessor(setErrors);
    this.planBurst(setErrors);
    return formProcessor;
  }

  /**
   * The simple form only displays an error message in a limited burst.
   */
  public abstract getMessages(): FormErrors<{}>;
}
