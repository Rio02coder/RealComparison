/* istanbul ignore file */
import {UserBackend} from '../types/service/server';
import User from '../types/User';
import {SessionTokens} from '../types/utilities/storage/Session';
import {convertToFrontendUserFormat} from '../utilities/adapters/User';
import ENDPOINTS from './endpoints';
import Requester from './Requester';
import {backend} from './server';
import SessionChainErrorHandler from '../utilities/errors/backend/SessionChainErrorHandler';

const getSessionRestorer = (
  sessionKeys: SessionTokens,
): SessionChainErrorHandler<
  string,
  string,
  UserBackend['user'],
  User,
  string
> =>
  new SessionChainErrorHandler(
    updatedSessionTokens => {
      sessionKeys.access = updatedSessionTokens.access;
      sessionKeys.refresh = updatedSessionTokens.refresh;
    },
    getBaseRestoringRequester(sessionKeys.access),
    sessionKeys.refresh,
  );

const getBaseRestoringRequester = (
  accessToken: string,
): Requester<string, UserBackend['user'], User, string> =>
  new Requester({
    api: backend(),
    responseHandler: recoveredSessionUser =>
      convertToFrontendUserFormat<true>(recoveredSessionUser),
    config: {
      method: 'GET',
      url: ENDPOINTS.USER.PROFILE,
      headers: {Authorization: `Bearer ${accessToken}`},
    },
  });

export default getSessionRestorer;
