/* istanbul ignore file */
import Requester from '../../../service/Requester';
import {BackendError} from '../../../types/service/server';
import {ErrorsMap} from '../../../types/utilities/errors/backend/ChainErrorHandler';
import ErrorMapper from '../../../types/utilities/errors/backend/ErrorMapper';
import GeneralBackendErrorHandler from './General';

/**
 * @type D The data format for which a backend retrieval failure occurred.
 * @type DR The raw data to be processed for the error recovery process.
 * @type T The raw answer the server will give in case of a successful request.
 * @type F The processed data after reasoning over `T` used for final recovery resolution.
 * @type S The format in which the data will be in fact sent to the server as (translated from `D`).
 * @type ND The data to further pass to a future error handler in case of recovery failure.
 * @type NT The raw answer the server will give the future error handler in case of a successful request.
 * @type NS The format in which the data will be in fact sent to the server by the future error handler (from `ND`).
 * @type NF The processed data after reasoning over `NT` used for further final recovery resolution.
 * @param recoveringAdapter The function to be used to convert the recovered data of the following error handler
 *                          to the currently asked for one.
 * @param immediateErrorMapper The function to map errors to self starting error format from possible repeated failure
 *                             of data retrieval recovery.
 * @param finalErrorMapper The function to map errors from the immediately next error handler, in case of another
 *                         future recovery failure, to the errors of the current error handler.
 */
export default class ChainErrorHandler<
  D = any,
  DR = D,
  T = any,
  F = any,
  S = D,
  ND = S,
  NT = any,
  NS = ND,
  NF = any,
> extends GeneralBackendErrorHandler<D, F> {
  private requester: Requester<DR, T, F, S>;
  protected furtherHandlers: ErrorsMap<S, ND, NT, NF, NS>;
  protected recoveringAdapter: (furtherRecoveredData: NF) => Promise<F>;
  protected immediateErrorMapper: ErrorMapper<D, S> | null = null;
  protected finalErrorMapper: ErrorMapper<D, NS> | null = null;

  public constructor(
    chainErrorHandler: ChainErrorHandler<D, DR, T, F, S, ND, NT, NS, NF>,
    isImmediateErrorMapperMandatory?: boolean,
  );

  public constructor(
    requester: Requester<DR, T, F, S>,
    error?: BackendError<D>,
    furtherHandlers?: ErrorsMap<S, ND, NT, NF, NS>,
    recoveringAdapter?: (furtherRecoveredData: NF) => Promise<F>,
    immediateErrorMapper?: ErrorMapper<D, S>,
    finalErrorMapper?: ErrorMapper<D, NS>,
  );

  public constructor(...args: any[]) {
    // todo: better type checking for the provided translation method...
    const defaultRecoveringAdapter = (recoveredData: NF) =>
      new Promise<F>((resolve, reject) =>
        resolve(recoveredData as unknown as F),
      );
    const getDefaultRecoveringAdapter = (
      currentRecoveringAdapter?: typeof defaultRecoveringAdapter,
    ): typeof defaultRecoveringAdapter =>
      currentRecoveringAdapter
        ? currentRecoveringAdapter
        : defaultRecoveringAdapter;
    if (args[0] instanceof ChainErrorHandler) {
      const chainErrorHandler = args[0] as ChainErrorHandler<
        D,
        DR,
        T,
        F,
        S,
        ND,
        NT,
        NS,
        NF
      >;
      const isImmediateErrorMapperMandatory: boolean = args[1];
      const error = chainErrorHandler.getError();
      super(error ? error : undefined);
      this.requester = chainErrorHandler.getRequester();
      this.furtherHandlers = chainErrorHandler.furtherHandlers;
      this.recoveringAdapter = chainErrorHandler.recoveringAdapter;
      const shouldDefaultImmediateErrorMapper =
        isImmediateErrorMapperMandatory &&
        !chainErrorHandler.immediateErrorMapper;
      this.immediateErrorMapper = shouldDefaultImmediateErrorMapper
        ? errors => errors as unknown as BackendError<D>
        : chainErrorHandler.immediateErrorMapper;
      this.finalErrorMapper = chainErrorHandler.finalErrorMapper;
      return;
    }
    const requester = args[0] as Requester<DR, T, F, S>;
    const error = args[1] as BackendError<D> | undefined;
    const furtherHandlers = args[2] as ErrorsMap<S, ND, NT, NF, NS> | undefined;
    const recoveringAdapter = args[3] as
      | typeof defaultRecoveringAdapter
      | undefined;
    const immediateErrorMapper = args[4] as ErrorMapper<D, S> | undefined;
    const finalErrorMapper = args[5] as ErrorMapper<D, NS> | undefined;
    super(error);
    this.requester = requester;
    this.furtherHandlers = furtherHandlers ? furtherHandlers : new Map();
    this.recoveringAdapter = getDefaultRecoveringAdapter(recoveringAdapter);
    this.immediateErrorMapper = immediateErrorMapper
      ? immediateErrorMapper
      : null;
    this.finalErrorMapper = finalErrorMapper ? finalErrorMapper : null;
  }

  public setRequester(requester: Requester<DR, T, F, S>) {
    this.requester = requester;
  }

  public getRequester(): Requester<DR, T, F, S> {
    return this.requester;
  }

  /**
   * Obey to the law of Demeter.
   * @param values The values to be set into the requester.
   */
  protected setRequesterValues(values: DR, isStringified: boolean = false) {
    const JSONFormatValues: DR = isStringified
      ? this.stringifyEveryValue(values)
      : values;
    this.requester.setValues(JSONFormatValues);
  }

  private stringifyEveryValue(values: DR): DR {
    const JSONFormatValues = {...values};
    for (const key in JSONFormatValues) {
      JSONFormatValues[key] = JSON.parse(
        JSONFormatValues[key] as unknown as string,
      );
    }
    return JSONFormatValues;
  }

  /**
   * @param error The error this handler will try to recover from in case of a failure on its own recovery trial...
   * @returns True if the handler has further handler knowing how to attempt recovery from the passed `error`.
   */
  private canFurtherRecover(error: BackendError<S>): boolean {
    return this.getFutureErrorHandler(error) != undefined;
  }

  private getFutureErrorHandler(
    error: BackendError<S>,
  ): ChainErrorHandler<S, ND, NT, NF, NS> | undefined {
    const errorStatus = error.response.status;
    return this.furtherHandlers.get(errorStatus);
  }

  /**
   * This method should not be called if no error has been already set to be managed. If it is called without a valid
   * error already set into place, extra care should be taken with this call by providing a valid immediateErrorMapper.
   */
  public recover(): Promise<F> {
    return new Promise<F>((resolve, reject) => {
      this.requester
        .query()
        .then(recoveredData => resolve(recoveredData))
        .catch((error: BackendError<S>) => {
          if (this.immediateErrorMapper) {
            this.setError(this.immediateErrorMapper(error));
          }
          if (!this.canFurtherRecover(error)) {
            return reject(super.getValidError());
          }
          const nextErrorHandler = this.getFutureErrorHandler(
            error,
          ) as ChainErrorHandler<S, ND, NT, NF, NS>;
          nextErrorHandler.setError(error);
          nextErrorHandler
            .recover()
            .then(furtherRecoveredData =>
              resolve(this.recoveringAdapter(furtherRecoveredData)),
            )
            .catch((furtherError: BackendError<NS>) => {
              if (this.finalErrorMapper) {
                this.setError(this.finalErrorMapper(furtherError));
              }
              return reject(super.getValidError());
            });
        });
    });
  }

  public getMessage(): string {
    if (this.getError() == null) {
      return 'Something went wrong.';
    }
    return (this.getError() as BackendError<D>).toJSON().toString();
  }
}
