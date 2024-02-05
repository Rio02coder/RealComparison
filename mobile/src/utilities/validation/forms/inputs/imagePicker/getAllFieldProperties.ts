import {FormikProps} from 'formik';
import {ImageSliderPreviewsValidationSchema} from '../../../../../types/components/forms/standalone/imagePicker/ImageSlider';

const getAllFieldProperties = (
  formikProps: FormikProps<any>,
  name: string,
): ImageSliderPreviewsValidationSchema => {
  const allFieldProperties = formikProps.values[name];
  if (typeof allFieldProperties === 'string') {
    return JSON.parse(allFieldProperties);
  }
  return allFieldProperties;
};

export default getAllFieldProperties;
