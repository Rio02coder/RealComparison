/* istanbul ignore file */
import ENDPOINTS from '../../../../../service/endpoints';
import Requester from '../../../../../service/Requester';
import {backend} from '../../../../../service/server';
import {FormErrors} from '../../../../../types/components/forms/FormContext';
import {UserBackend} from '../../../../../types/service/server';
import User from '../../../../../types/User';
import AuthenticationData from '../../../../../types/utilities/authentication/Authentifier';
import {ErrorsMap} from '../../../../../types/utilities/errors/backend/ChainErrorHandler';
import {convertToFrontendUserFormat} from '../../../../adapters/User';
import SimpleFormErrorHandler from './Simple';

export default class BackendOAuthFormErrorHandler extends SimpleFormErrorHandler<
  AuthenticationData,
  User,
  UserBackend,
  AuthenticationData
> {
  constructor(
    authenticationData: AuthenticationData,
    furtherHandlers: ErrorsMap<
      AuthenticationData,
      AuthenticationData,
      UserBackend,
      User,
      AuthenticationData
    >,
  ) {
    super(
      new Requester(
        {
          api: backend(),
          responseHandler: loggedUser =>
            convertToFrontendUserFormat(loggedUser),
          config: {
            url: ENDPOINTS.USER.AUTHENTICATION.OAUTH.LOGIN,
            method: 'POST',
          },
        },
        authenticationData,
      ),
      undefined,
      furtherHandlers,
    );
  }

  public getMessages(): FormErrors<{}> {
    switch (this.getValidError().response.status) {
      case 404:
        return {
          default: 'No account found.',
        };
      case 409:
        return {
          default: 'Associated email already used by another user.',
        };
      default:
        // no specific field errors, just a general one will be displayed
        return {};
    }
  }
}
