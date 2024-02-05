/* istanbul ignore file */
import ReduxProps from '../../../../../types/redux/props';
import addRemovalDependencyToPropertyImagesAdditionRequester from './addRemovalDependency';
import getPropertyImagesAdditionRequester from './getAdditionRequester';

const getBackendImageSliderFormErrorHandlerRequester = (
  reduxProps: ReduxProps,
  propertyId: number,
) => {
  const propertyImagesAdditionRequester = getPropertyImagesAdditionRequester(
    propertyId,
    reduxProps,
  );
  addRemovalDependencyToPropertyImagesAdditionRequester(
    reduxProps,
    propertyId,
    propertyImagesAdditionRequester,
  );
  return propertyImagesAdditionRequester;
};

export default getBackendImageSliderFormErrorHandlerRequester;
