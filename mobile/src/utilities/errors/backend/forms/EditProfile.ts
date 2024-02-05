/* istanbul ignore file */
import {FormikErrors} from 'formik';
import {EditProfileFormEntity} from '../../../../screens/EditProfile';
import ENDPOINTS from '../../../../service/endpoints';
import Requester from '../../../../service/Requester';
import {backend} from '../../../../service/server';
import {
  PasswordlessUserBackend,
  UserBackend,
} from '../../../../types/service/server';
import User from '../../../../types/User';
import {convertToFrontendUserFormat} from '../../../adapters/User';
import GeneralBackendFormErrorHandler from './General';
import SessionChainErrorHandler from '../SessionChainErrorHandler';
import getUserUpdatingSlice from '../../../storage/ReduxTokenizer';
import ReduxProps from '../../../../types/redux/props';
import ChainErrorHandler from '../ChainErrorHandler';

export default class BackendEditProfileFormErrorHandler extends GeneralBackendFormErrorHandler<
  EditProfileFormEntity,
  User,
  UserBackend,
  PasswordlessUserBackend['user']
> {
  constructor(
    reduxProps: ReduxProps,
    completeEditProfile: (updatedUser: User) => void,
  ) {
    super(
      new SessionChainErrorHandler<
        EditProfileFormEntity,
        EditProfileFormEntity,
        UserBackend,
        User,
        PasswordlessUserBackend['user']
      >(
        getUserUpdatingSlice(reduxProps),
        new Requester({
          api: backend(),
          responseHandler: user => {
            const updatedUser = convertToFrontendUserFormat(user);
            completeEditProfile(updatedUser);
            return updatedUser;
          },
          config: {
            method: 'PATCH',
            url: ENDPOINTS.USER.EDIT_PROFILE,
          },
        }),
      ) as unknown as ChainErrorHandler<
        EditProfileFormEntity,
        EditProfileFormEntity,
        UserBackend,
        User,
        PasswordlessUserBackend['user']
      >,
    );
  }

  public getMessages(): FormikErrors<EditProfileFormEntity> {
    switch (this.getValidError().response.status) {
      case 400:
        return {
          email: 'Email already taken',
        };
      default:
        // no specific field errors, just a general one will be displayed
        return {};
    }
  }
}
