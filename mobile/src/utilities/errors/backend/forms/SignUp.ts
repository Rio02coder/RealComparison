/* istanbul ignore file */
import {FormikErrors} from 'formik';
import {SignUpFormEntity} from '../../../../screens/SignUp';
import ENDPOINTS from '../../../../service/endpoints';
import Requester from '../../../../service/Requester';
import {backend} from '../../../../service/server';
import {UserBackend} from '../../../../types/service/server';
import User from '../../../../types/User';
import {
  convertToFrontendUserFormat,
  convertToRawBackendUserFormat,
} from '../../../adapters/User';
import GeneralBackendFormErrorHandler from './General';
import ChainErrorHandler from '../ChainErrorHandler';

export default class BackendSignUpFormErrorHandler extends GeneralBackendFormErrorHandler<
  SignUpFormEntity,
  User,
  UserBackend,
  UserBackend['user']
> {
  constructor(completeSignup: () => void) {
    super(
      new ChainErrorHandler<
        SignUpFormEntity,
        SignUpFormEntity,
        UserBackend,
        User,
        UserBackend['user']
      >(
        new Requester<SignUpFormEntity, UserBackend, User, UserBackend['user']>(
          {
            api: backend(),
            adapter: signupData =>
              convertToRawBackendUserFormat(
                signupData as unknown as User,
                signupData.password,
              ),
            responseHandler: createdUser => {
              completeSignup();
              return convertToFrontendUserFormat(createdUser);
            },
            config: {
              method: 'POST',
              url: ENDPOINTS.USER.AUTHENTICATION.STANDARD.SIGNUP,
            },
          },
        ),
      ),
    );
  }

  public getMessages(): FormikErrors<SignUpFormEntity> {
    switch (this.getValidError().response.status) {
      case 409:
        return {
          email: 'Email already taken',
        };
      default:
        // no specific field errors, just a general one will be displayed
        return {};
    }
  }
}
