/* istanbul ignore file */
import ReduxProps from '../../../../../types/redux/props';
import getPropertyImagesAdditionRequester from './getAdditionRequester';
import SessionChainErrorHandler from '../../SessionChainErrorHandler';
import {PropertyProfilePatch} from '../../../../../types/components/forms/standalone/imagePicker/ImageSlider';
import {ImageSliderFormEntity} from '../../../../../components/forms/standalone/imagePicker/ImageSlider';
import PhotographedEntity from '../../../../../types/PhotographedEntity';
import getUserUpdatingSlice from '../../../../storage/ReduxTokenizer';
import Requester from '../../../../../service/Requester';
import {backend} from '../../../../../service/server';
import ENDPOINTS from '../../../../../service/endpoints';

const getRemovalDependencyResolver = (
  reduxProps: ReduxProps,
  propertyId: number,
  independentPropertyImagesAdditionRequester: ReturnType<
    typeof getPropertyImagesAdditionRequester
  >,
) =>
  new SessionChainErrorHandler<
    PropertyProfilePatch,
    ImageSliderFormEntity,
    PhotographedEntity,
    ImageSliderFormEntity,
    PropertyProfilePatch
  >(
    getUserUpdatingSlice(reduxProps),
    new Requester<
      ImageSliderFormEntity,
      PhotographedEntity,
      ImageSliderFormEntity,
      PropertyProfilePatch
    >({
      api: backend(),
      responseHandler: () =>
        independentPropertyImagesAdditionRequester.getValues() as ImageSliderFormEntity,
      adapter: imageSliderFormEntity => ({
        property_id: propertyId,
        images: imageSliderFormEntity.previews.removed,
      }),
      config: {
        method: 'POST',
        url: ENDPOINTS.PROPERTY.IMAGES.REMOVE,
      },
    }),
  );

export default getRemovalDependencyResolver;
