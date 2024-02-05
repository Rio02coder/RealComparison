import React, {useEffect, useState} from 'react';
import {FormTypes} from '../../../../types/components/forms/BaseForm';
import Input from '../../input/Input';
import {InputType} from '../../../../types/components/forms/input/Input';
import Form from '../../Form';
import ImageSliderSubmit from './Submit';
import ImageSliderProps from '../../../../types/components/forms/standalone/imagePicker/ImageSlider';
import defaultStyles from '../../../../styles/components/forms/standalone/imagePicker/ImageSlider';
import {array, InferType, object, string} from 'yup';
import {ObjectShape} from 'yup/lib/object';
import BackendImageSliderFormErrorHandler from '../../../../utilities/errors/backend/forms/imageSlider/ImageSlider';

export const ImageSliderPreviewsSchema = object({
  current: array().of(string().defined()).defined(),
  added: array().of(string().defined()).defined(),
  removed: array().of(string().defined()).defined(),
});

export const ImageSliderValidationRules = {
  previews: ImageSliderPreviewsSchema.defined().required(),
};

export const ImageProfileSchema = object(ImageSliderValidationRules);

export interface ImageSliderFormEntity
  extends InferType<typeof ImageProfileSchema> {}

const ImageSlider: React.FC<ImageSliderProps> = ({
  isInspectedByOwner,
  previews,
  styles,
  reduxProps,
  propertyId,
}) => {
  const [changedImages, setChangedImages] = useState(false);
  const [shouldReset, setShouldReset] = useState(false);
  const markNeededReset = () => setShouldReset(true);
  useEffect(markNeededReset, [previews]);

  return (
    <Form
      notEditable={!isInspectedByOwner}
      stringifiedFormat
      style={[defaultStyles.form, styles?.form]}
      inputStyle={{container: defaultStyles.input, ...styles?.input}}
      validationRules={ImageSliderValidationRules as ObjectShape}
      name={FormTypes.CHANGE_PROPERTY_IMAGES}
      initialValues={{
        previews: {
          current: previews,
          added: [],
          removed: [],
        },
      }}
      submissionHandler={{
        requester: {
          handler: new BackendImageSliderFormErrorHandler(
            reduxProps,
            propertyId,
          ),
        },
      }}>
      <Input
        name={'previews'}
        inputType={InputType.IMAGE_PICKER}
        props={{
          confirmSubmission: setChangedImages,
          reset: {
            isNeeded: shouldReset,
            confirm: () => setShouldReset(false),
          },
        }}
      />
      <ImageSliderSubmit canSubmit={changedImages} />
    </Form>
  );
};

export default ImageSlider;
