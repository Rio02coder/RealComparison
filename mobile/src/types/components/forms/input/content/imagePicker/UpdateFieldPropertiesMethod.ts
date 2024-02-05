import RequireAtLeastOne from '../../../../../RequireAtLeastOne';
import {ImageSliderPreviewsValidationSchema} from '../../../standalone/imagePicker/ImageSlider';

type UpdateFieldPropertiesMethod = (
  updatedFieldPropertiesPayload: RequireAtLeastOne<ImageSliderPreviewsValidationSchema>,
) => void;

export default UpdateFieldPropertiesMethod;
