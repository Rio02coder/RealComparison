/* istanbul ignore file */
import Requester from '../../../../../service/Requester';
import {ImageSliderFormEntity} from '../../../../../components/forms/standalone/imagePicker/ImageSlider';
import PhotographedEntity from '../../../../../types/PhotographedEntity';
import {PropertyProfilePatch} from '../../../../../types/components/forms/standalone/imagePicker/ImageSlider';
import {backend} from '../../../../../service/server';
import ENDPOINTS from '../../../../../service/endpoints';
import ReduxProps from '../../../../../types/redux/props';
import {updateOwnedPropertyImage} from '../../../../property/OwnedPropertyManager';

const getPropertyImagesAdditionRequester = (
  propertyId: number,
  reduxProps: ReduxProps,
) =>
  new Requester<
    ImageSliderFormEntity,
    PhotographedEntity,
    PhotographedEntity,
    PropertyProfilePatch
  >({
    api: backend(),
    responseHandler: overloadedImages => {
      updateOwnedPropertyImage(propertyId, reduxProps, overloadedImages);
      return overloadedImages;
    },
    adapter: formOrganisedData => ({
      property_id: propertyId,
      images: formOrganisedData.previews.added,
    }),
    config: {
      method: 'POST',
      url: ENDPOINTS.PROPERTY.IMAGES.ADD,
    },
  });

export default getPropertyImagesAdditionRequester;
