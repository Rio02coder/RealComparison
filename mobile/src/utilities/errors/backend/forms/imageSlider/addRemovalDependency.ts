/* istanbul ignore file */
import ReduxProps from '../../../../../types/redux/props';
import Dependency from '../../../../../service/Dependency';
import {ImageSliderFormEntity} from '../../../../../components/forms/standalone/imagePicker/ImageSlider';
import {PropertyProfilePatch} from '../../../../../types/components/forms/standalone/imagePicker/ImageSlider';
import getPropertyImagesAdditionRequester from './getAdditionRequester';
import getRemovalDependencyResolver from './getRemovalDependencyResolver';

const addRemovalDependencyToPropertyImagesAdditionRequester = (
  reduxProps: ReduxProps,
  propertyId: number,
  independentPropertyImagesAdditionRequester: ReturnType<
    typeof getPropertyImagesAdditionRequester
  >,
) =>
  independentPropertyImagesAdditionRequester.setDependency(
    new Dependency<
      true,
      ImageSliderFormEntity,
      PropertyProfilePatch,
      ImageSliderFormEntity,
      PropertyProfilePatch
    >(
      getRemovalDependencyResolver(
        reduxProps,
        propertyId,
        independentPropertyImagesAdditionRequester,
      ),
      imageSliderFormEntity => imageSliderFormEntity,
    ),
  );

export default addRemovalDependencyToPropertyImagesAdditionRequester;
