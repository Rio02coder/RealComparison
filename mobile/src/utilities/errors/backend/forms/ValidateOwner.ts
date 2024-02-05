/* istanbul ignore file */
import GeneralBackendFormErrorHandler from './General';
import {ValidateOwnerEntity} from '../../../../components/property/ValidateOwner';
import {FormikErrors} from 'formik';
import Requester from '../../../../service/Requester';
import {backend} from '../../../../service/server';
import ENDPOINTS from '../../../../service/endpoints';
import ChainErrorHandler from '../ChainErrorHandler';
import {
  BackEndValidateOwner,
  FrontEndValidateOwner,
} from '../../../../types/ValidateOwner';
import {ConvertToBackEndOwnerVerificationFormat} from '../../../adapters/VerifyOwner';

export default class BackendValidateOwnerFormErrorHandler extends GeneralBackendFormErrorHandler<
  ValidateOwnerEntity,
  void,
  void,
  BackEndValidateOwner
> {
  constructor(completeVerificationProcess: () => void) {
    super(
      new ChainErrorHandler<
        ValidateOwnerEntity,
        ValidateOwnerEntity,
        void,
        void,
        BackEndValidateOwner
      >(
        new Requester<ValidateOwnerEntity, void, void, BackEndValidateOwner>({
          api: backend(),
          responseHandler: () => completeVerificationProcess(),
          adapter: data =>
            ConvertToBackEndOwnerVerificationFormat(
              data as unknown as FrontEndValidateOwner,
            ),
          config: {url: ENDPOINTS.PROPERTY.VERIFY_OWNERSHIP, method: 'POST'},
        }),
      ),
    );
  }

  public getMessages(): FormikErrors<ValidateOwnerEntity> {
    switch (this.getValidError().response.status) {
      case 400:
        return {
          Code: 'Some error occurred',
        };
      case 403:
        return {
          Code: 'This code is not linked to you',
        };
      case 404:
        return {
          Code: 'This code is does not exist',
        };
      case 409:
        return {
          Code: 'This code has expired',
        };
      default:
        return {};
    }
  }
}
