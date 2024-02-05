import {FormikProps} from 'formik';
import UpdateFieldPropertiesMethod from '../../../../../types/components/forms/input/content/imagePicker/UpdateFieldPropertiesMethod';
import {ImageSliderPreviewsValidationSchema} from '../../../../../types/components/forms/standalone/imagePicker/ImageSlider';

const getUpdateFieldPropertiesMethod =
  (
    allFieldProperties: ImageSliderPreviewsValidationSchema,
    formikProps: FormikProps<any>,
    name: string,
  ): UpdateFieldPropertiesMethod =>
  updatedPropertiesPayload => {
    const {current, added, removed} = allFieldProperties;
    const updatedCurrent = updatedPropertiesPayload.current;
    const updatedAdded = updatedPropertiesPayload.added;
    const updatedRemoved = updatedPropertiesPayload.removed;
    const updatedFieldProperties: ImageSliderPreviewsValidationSchema = {
      current: updatedCurrent ? updatedCurrent : current,
      added: updatedAdded ? updatedAdded : added,
      removed: updatedRemoved ? updatedRemoved : removed,
    };
    formikProps.handleChange(name)(JSON.stringify(updatedFieldProperties));
  };

export default getUpdateFieldPropertiesMethod;
