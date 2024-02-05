/* istanbul ignore file */
import {FormikErrors} from 'formik';
import {LoginFormEntity} from '../../../../screens/Login';
import ENDPOINTS from '../../../../service/endpoints';
import Requester from '../../../../service/Requester';
import {backend} from '../../../../service/server';
import {UserBackend} from '../../../../types/service/server';
import User from '../../../../types/User';
import {convertToFrontendUserFormat} from '../../../adapters/User';
import GeneralBackendFormErrorHandler from './General';
import ChainErrorHandler from '../ChainErrorHandler';

export default class BackendLoginFormErrorHandler extends GeneralBackendFormErrorHandler<
  LoginFormEntity,
  User,
  UserBackend,
  UserBackend
> {
  constructor(completeLoginProcess: (loggedUser: User) => void) {
    super(
      new ChainErrorHandler<
        LoginFormEntity,
        LoginFormEntity,
        UserBackend,
        User,
        UserBackend
      >(
        new Requester<LoginFormEntity, UserBackend, User, UserBackend>({
          api: backend(),
          responseHandler: toBeLoggedInUser => {
            const loggedUser = convertToFrontendUserFormat(toBeLoggedInUser);
            completeLoginProcess(loggedUser);
            return loggedUser;
          },
          config: {
            method: 'POST',
            url: ENDPOINTS.USER.AUTHENTICATION.STANDARD.LOGIN,
          },
        }),
      ),
    );
  }

  public getMessages(): FormikErrors<LoginFormEntity> {
    switch (this.getValidError().response.status) {
      case 401:
      case 404:
        return {
          email: 'Email may be incorrect',
          password: 'Password may be incorrect',
        };
      case 403:
        return {
          email: 'Email unverified',
        };
      default:
        // no specific field errors, just a general one will be displayed
        return {};
    }
  }
}
