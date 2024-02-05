/* istanbul ignore file */
import {FormikErrors} from 'formik';
import ReduxProps from '../../../../../types/redux/props';
import ENDPOINTS from '../../../../../service/endpoints';
import {EmailReconfirmationEntity} from '../../../../../components/forms/prebuilt/screens/Login/EmailReconfirmation';
import GeneralBackendFormErrorHandler from '../General';
import SessionChainErrorHandler from '../../SessionChainErrorHandler';
import getUserUpdatingSlice from '../../../../storage/ReduxTokenizer';
import Requester from '../../../../../service/Requester';
import {backend} from '../../../../../service/server';
import {Alert} from 'react-native';
import ChainErrorHandler from '../../ChainErrorHandler';

export default class BackendEmailReconfirmationFormErrorHandler extends GeneralBackendFormErrorHandler<
  EmailReconfirmationEntity,
  void,
  void,
  EmailReconfirmationEntity
> {
  public constructor(reduxProps: ReduxProps) {
    super(
      new SessionChainErrorHandler<
        EmailReconfirmationEntity,
        EmailReconfirmationEntity,
        void,
        void,
        EmailReconfirmationEntity
      >(
        getUserUpdatingSlice(reduxProps),
        new Requester<
          EmailReconfirmationEntity,
          void,
          void,
          EmailReconfirmationEntity
        >({
          api: backend(),
          responseHandler: () =>
            Alert.alert('A verification email was successfully resent!'),
          config: {
            method: 'POST',
            url: ENDPOINTS.USER.VERIFY_EMAIL,
          },
        }),
      ) as unknown as ChainErrorHandler<
        EmailReconfirmationEntity,
        EmailReconfirmationEntity,
        void,
        void,
        EmailReconfirmationEntity
      >,
    );
  }

  getMessages(): FormikErrors<EmailReconfirmationEntity> {
    switch (this.getValidError().response.status) {
      default:
        // no specific field errors, just a general one will be displayed
        return {};
    }
  }
}
