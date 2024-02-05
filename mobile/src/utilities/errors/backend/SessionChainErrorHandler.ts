/* istanbul ignore file */
import store from '../../../redux/store';
import ENDPOINTS from '../../../service/endpoints';
import Requester from '../../../service/Requester';
import {backend} from '../../../service/server';
import {SessionRestoringRequest} from '../../../types/service/Restorer';
import {BackendError, UserBackend} from '../../../types/service/server';
import {ErrorsMap} from '../../../types/utilities/errors/backend/ChainErrorHandler';
import ErrorMapper from '../../../types/utilities/errors/backend/ErrorMapper';
import {SessionTokens} from '../../../types/utilities/storage/Session';
import ChainErrorHandler from './ChainErrorHandler';

/**
 * Behaves the same way a `ConcreteChainErrorHandler` would, but this one
 * will by default look after the access token having expired and will try
 * to restore the tokens pair with the use of the other refresh token.
 * In the successful cases in which tokens are refreshed to new access
 * tokens, the global redux backend instance will also get updated.
 */
export default class SessionChainErrorHandler<
  D = any,
  DR = D,
  T = any,
  F = any,
  S = D,
> extends ChainErrorHandler<
  D,
  DR,
  T,
  F,
  S,
  SessionRestoringRequest,
  UserBackend,
  SessionRestoringRequest,
  SessionTokens
> {
  private static readonly EXPIRED_SESSION_ERROR_CODE = 401;

  private userSessionUpdater: (updatedSessionTokens: SessionTokens) => void;
  private forcedRefreshToken?: string;

  /**
   * @param immediateErrorMapper Safer to avoid making it null in this enhanced
   *                             version of the ConcreteChainErrorHandler.
   * @param refreshToken If provided, this will be forced into the recovery process
   *                     instead of making use of the globally stored one. This may
   *                     be useful when trying to recover a previous session which
   *                     does not currently exist yet.
   */
  constructor(
    userSessionUpdater: (updatedSessionTokens: SessionTokens) => void,
    requester: Requester<DR, T, F, S>,
    refreshToken?: string,
    error?: BackendError<D>,
    furtherHandlers: ErrorsMap<
      S,
      SessionRestoringRequest,
      UserBackend,
      SessionTokens,
      SessionRestoringRequest
    > = new Map(),
    immediateErrorMapper: ErrorMapper<D, S> = receivedErrors =>
      receivedErrors as unknown as BackendError<D>,
    finalErrorMapper?: ErrorMapper<D, SessionRestoringRequest>,
  ) {
    super(
      requester,
      error,
      furtherHandlers,
      updatedSessionTokens =>
        this.convertRenewedTokensToFinalResponse(updatedSessionTokens),
      immediateErrorMapper,
      finalErrorMapper,
    );
    this.forcedRefreshToken = refreshToken;
    this.userSessionUpdater = userSessionUpdater;
  }

  /**
   * Also update the user's state to the latest pair of tokens.
   */
  private convertRenewedTokensToFinalResponse(
    renewedTokens: SessionTokens,
  ): Promise<F> {
    const outdatedSessionRequester = this.getRequester();
    this.userSessionUpdater(renewedTokens);
    if (this.forcedRefreshToken) {
      this.forcedRefreshToken = renewedTokens.refresh;
    }
    outdatedSessionRequester.updateAPI({
      headers: {Authorization: `Bearer ${renewedTokens.access}`},
    });
    return outdatedSessionRequester.query();
  }

  /**
   * Makes sure the session recoverer will remain up to date
   * even after updating sessions.
   */
  public recover(): Promise<F> {
    this.renewSessionErrorHandler();
    return super.recover();
  }

  private renewSessionErrorHandler() {
    this.furtherHandlers.set(
      SessionChainErrorHandler.EXPIRED_SESSION_ERROR_CODE,
      this.getSessionErrorHandler(),
    );
  }

  private getSessionErrorHandler(): ChainErrorHandler<
    S,
    SessionRestoringRequest,
    UserBackend,
    SessionTokens,
    SessionRestoringRequest,
    SessionRestoringRequest
  > {
    return new ChainErrorHandler(
      new Requester(
        {
          api: backend(),
          responseHandler: renewedTokens =>
            renewedTokens.token as SessionTokens,
          config: {
            method: 'POST',
            url: ENDPOINTS.USER.AUTHENTICATION.TOKEN.REFRESH,
          },
        },
        {
          token: this.forcedRefreshToken
            ? this.forcedRefreshToken
            : store.getState().user?.token.refresh,
        },
      ),
    );
  }
}
