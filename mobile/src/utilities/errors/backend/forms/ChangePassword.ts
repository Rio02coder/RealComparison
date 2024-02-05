/* istanbul ignore file */
import {FormikErrors} from 'formik';
import ENDPOINTS from '../../../../service/endpoints';
import Requester from '../../../../service/Requester';
import {backend} from '../../../../service/server';
import GeneralBackendFormErrorHandler from './General';
import ChainErrorHandler from '../ChainErrorHandler';
import {ChangePasswordFormEntity} from '../../../../screens/ChangePassword';
import SessionChainErrorHandler from '../SessionChainErrorHandler';
import getUserUpdatingSlice from '../../../storage/ReduxTokenizer';
import {Alert} from 'react-native';
import ReduxProps from '../../../../types/redux/props';

export default class BackendChangePasswordFormErrorHandler extends GeneralBackendFormErrorHandler<
  ChangePasswordFormEntity,
  void,
  void,
  ChangePasswordFormEntity
> {
  constructor(reduxProps: ReduxProps) {
    super(
      new SessionChainErrorHandler<
        ChangePasswordFormEntity,
        ChangePasswordFormEntity,
        void,
        void,
        ChangePasswordFormEntity
      >(
        getUserUpdatingSlice(reduxProps),
        new Requester<
          ChangePasswordFormEntity,
          void,
          void,
          ChangePasswordFormEntity
        >({
          api: backend(),
          responseHandler: () =>
            Alert.alert('Your password was successfully updated!'),
          config: {
            method: 'PATCH',
            url: ENDPOINTS.USER.EDIT_PASSWORD,
          },
        }),
      ) as unknown as ChainErrorHandler<
        ChangePasswordFormEntity,
        ChangePasswordFormEntity,
        void,
        void,
        ChangePasswordFormEntity
      >,
    );
  }

  public getMessages(): FormikErrors<ChangePasswordFormEntity> {
    switch (this.getValidError().response.status) {
      case 400:
        return {
          new_password: 'Invalid new chosen password!',
        };
      case 401:
        return {
          current_password: 'Incorrect current password!',
        };
      default:
        // no specific field errors, just a general one will be displayed
        return {};
    }
  }
}
