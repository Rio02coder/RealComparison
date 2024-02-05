/* istanbul ignore file */
import ENDPOINTS from '../../service/endpoints';
import Requester from '../../service/Requester';
import {backend} from '../../service/server';
import {FormContextErrorHandler} from '../../types/components/forms/FormContext';
import {UserBackend} from '../../types/service/server';
import User from '../../types/User';
import AuthenticationData from '../../types/utilities/authentication/Authentifier';
import {ErrorsMap} from '../../types/utilities/errors/backend/ChainErrorHandler';
import {convertToFrontendUserFormat} from '../adapters/User';
import ChainErrorHandler from '../errors/backend/ChainErrorHandler';
import BackendOAuthFormErrorHandler from '../errors/backend/forms/simple/OAuth';

const authentifier = (
  authenticationData: AuthenticationData,
  setErrors: FormContextErrorHandler<{}>,
): [Promise<User | null>, Function] => {
  const requester = getCredentialsRequester(
    authenticationData,
    getErrorsMap(authenticationData),
  );
  const cancelBurst = () => requester.cancelBurst();
  return [
    requester.getFormProcessor(setErrors)(authenticationData),
    cancelBurst,
  ];
};

const getCredentialsRequester = (
  authenticationData: AuthenticationData,
  errorsMap: ErrorsMap<
    AuthenticationData,
    AuthenticationData,
    UserBackend,
    User,
    AuthenticationData
  >,
) => new BackendOAuthFormErrorHandler(authenticationData, errorsMap);

const getErrorsMap = (authenticationData: AuthenticationData) => {
  const errorsMap: ErrorsMap<
    AuthenticationData,
    AuthenticationData,
    UserBackend,
    User,
    AuthenticationData
  > = new Map();
  const inexistentAccountErrorCode = 404;
  errorsMap.set(
    inexistentAccountErrorCode,
    getErrorHandler(authenticationData),
  );
  return errorsMap;
};

const getErrorHandler = (authenticationData: AuthenticationData) =>
  new ChainErrorHandler<
    AuthenticationData,
    AuthenticationData,
    UserBackend,
    User,
    AuthenticationData,
    AuthenticationData
  >(
    new Requester(
      {
        api: backend(),
        responseHandler: loggedUser => convertToFrontendUserFormat(loggedUser),
        config: {
          url: ENDPOINTS.USER.AUTHENTICATION.OAUTH.SIGNUP,
          method: 'POST',
        },
      },
      authenticationData,
    ),
  );

export default authentifier;
