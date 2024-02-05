import {ImageSliderPreviewsValidationSchema} from '../../../../../types/components/forms/standalone/imagePicker/ImageSlider';

const getDisplayableProperties = (
  getAllFieldProperties: () => ImageSliderPreviewsValidationSchema,
): string[] => {
  const allFieldProperties = getAllFieldProperties();
  return [...allFieldProperties.current, ...allFieldProperties.added];
};

export default getDisplayableProperties;
