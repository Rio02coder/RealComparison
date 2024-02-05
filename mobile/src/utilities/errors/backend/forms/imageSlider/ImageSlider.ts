/* istanbul ignore file */
import GeneralBackendFormErrorHandler from '../General';
import ReduxProps from '../../../../../types/redux/props';
import SessionChainErrorHandler from '../../SessionChainErrorHandler';
import getUserUpdatingSlice from '../../../../storage/ReduxTokenizer';
import ChainErrorHandler from '../../ChainErrorHandler';
import {ImageSliderFormEntity} from '../../../../../components/forms/standalone/imagePicker/ImageSlider';
import PhotographedEntity from '../../../../../types/PhotographedEntity';
import {FormikErrors} from 'formik';
import {PropertyProfilePatch} from '../../../../../types/components/forms/standalone/imagePicker/ImageSlider';
import getBackendImageSliderFormErrorHandlerRequester from './getFormErrorHandlerRequester';

export default class BackendImageSliderFormErrorHandler extends GeneralBackendFormErrorHandler<
  ImageSliderFormEntity,
  PhotographedEntity,
  PhotographedEntity,
  PropertyProfilePatch
> {
  constructor(reduxProps: ReduxProps, propertyId: number) {
    super(
      new SessionChainErrorHandler<
        ImageSliderFormEntity,
        ImageSliderFormEntity,
        PhotographedEntity,
        PhotographedEntity,
        PropertyProfilePatch
      >(
        getUserUpdatingSlice(reduxProps),
        getBackendImageSliderFormErrorHandlerRequester(reduxProps, propertyId),
      ) as unknown as ChainErrorHandler<
        ImageSliderFormEntity,
        ImageSliderFormEntity,
        PhotographedEntity,
        PhotographedEntity,
        PropertyProfilePatch
      >,
    );
  }

  public getMessages(): FormikErrors<ImageSliderFormEntity> {
    // no specific field errors, just a general one will be displayed
    return {};
  }
}
