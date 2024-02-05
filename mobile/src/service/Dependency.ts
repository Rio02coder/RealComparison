/* istanbul ignore file */
import ChainErrorHandler from '../utilities/errors/backend/ChainErrorHandler';
import {BackendError} from '../types/service/server';

type ValueAdapter<U extends boolean = false, D = any, DD = any> = U extends true
  ? (dependencyStartingValues: D) => DD
  : undefined;

/**
 * @type U If true, this dependency must be fed the starting values of its dependant.
 * @type D The data dependency this object will be resolving to.
 * @type S The error format the dependency dependent is expecting to throw.
 * @type DD The data format the dependency resolver uses.
 * @type DS The possible error format in case of dependency resolution failure.
 */
export default class Dependency<
  U extends boolean = false,
  D = any,
  S = any,
  DD = any,
  DS = any,
> {
  private resolver: ChainErrorHandler<any, DD, any, D>;
  private readonly errorAdapter: (
    resolutionFailureError: BackendError<DS>,
  ) => BackendError<S>;
  /**
   * If provided, this method will be used to reason out starting values from the
   * dependent on this dependency to resolve itself.
   */
  private readonly valueAdapter: ValueAdapter<U, D, DD>;

  public constructor(
    resolver: ChainErrorHandler<any, DD, any, D>,
    valueAdapter: ValueAdapter<U, D, DD>,
    errorAdapter: (
      resolutionFailureError: BackendError<DS>,
    ) => BackendError<S> = resolutionFailureError =>
      resolutionFailureError as unknown as BackendError<S>,
  ) {
    this.resolver = resolver;
    this.errorAdapter = errorAdapter;
    this.valueAdapter = valueAdapter;
  }

  public needsStartingValues() {
    return this.valueAdapter != undefined;
  }

  /**
   * Try satisfying this dependency via the provided resolver. In case of failure, the original caught format
   * will be of a `BackendError<DS>` type, but the adapter will finally reject into a `BackendError<S>` error.
   */
  public satisfy(
    dependencyStartingValues: U extends true ? D : undefined,
  ): Promise<D> {
    this.prepareSatisfactionProcess(dependencyStartingValues);
    return new Promise<D>((resolve, reject) => {
      this.resolver
        .recover()
        .then(satisfiedDependency => resolve(satisfiedDependency))
        .catch((error: BackendError<DS>) => reject(this.errorAdapter(error)));
    });
  }

  /**
   * Feed the dependency resolver the dependant's starting values if relevant.
   */
  private prepareSatisfactionProcess(
    dependencyStartingValues: U extends true ? D : undefined,
  ) {
    if (dependencyStartingValues) {
      const adapter = this.valueAdapter as ValueAdapter<true, D, DD>;
      this.resolver
        .getRequester()
        .setValues(adapter(dependencyStartingValues as D));
    }
  }
}
