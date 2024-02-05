import React, {useContext, useEffect, useMemo, useState} from 'react';
import InputProps, {
  InputType,
} from '../../../../../types/components/forms/input/Input';
import {LayoutChangeEvent, View} from 'react-native';
import FormContextProps from '../../../../../types/components/forms/FormContext';
import {getSafeFormContext} from '../../../FormContexts';
import ImageSliderModal from '../../../../images/ImageSliderModal';
import ImageSubmissionTypeChooser from './SubmissionTypeChooser';
import ImagePickerFieldState from '../../../../../utilities/validation/forms/inputs/imagePicker/FieldState';
import {PROPERTY_PROFILE_RATIO} from '../../../../../types/utilities/storage/generatePropertyPicture';

const ImagePickerContent: React.FC<
  InputProps<InputType.IMAGE_PICKER>
> = props => {
  const {formikProps} = useContext<FormContextProps>(
    getSafeFormContext(props.formType),
  );

  const specificProps = props.props;

  // suggested solution by: https://stackoverflow.com/a/61497934/11340913
  const [containerWidth, setContainerWidth] = useState<number>(0);
  const _onViewLayoutChange = (event: LayoutChangeEvent) => {
    const {width} = event.nativeEvent.layout;
    setContainerWidth(width);
  };

  const fieldState = useMemo(
    () => new ImagePickerFieldState(formikProps, props.name),
    [formikProps, props.name],
  );

  const allowModification = props.notEditable !== true;

  const decidePropertyPictureRemovalMethod = () =>
    allowModification ? fieldState.removePropertyPicture : undefined;

  const confirmSubmission = () => {
    if (!props.props.confirmSubmission) {
      return;
    }
    props.props.confirmSubmission(fieldState.hasChanges());
  };

  useEffect(confirmSubmission, [fieldState, props.props]);

  const reset = () => {
    if (!specificProps.reset?.isNeeded) {
      return;
    }
    fieldState.reset();
    specificProps.reset.confirm();
  };

  useEffect(reset, [fieldState, specificProps.reset]);

  return (
    <View style={props.styles?.container} onLayout={_onViewLayoutChange}>
      {allowModification && (
        <ImageSubmissionTypeChooser
          styles={{icon: props.styles?.icon, caption: props.styles?.text}}
          chooseCamera={() => fieldState.handlePictureAddition(true)}
          chooseGallery={() => fieldState.handlePictureAddition(false)}
        />
      )}
      <ImageSliderModal
        styles={{
          preview: {
            aspectRatio: PROPERTY_PROFILE_RATIO,
            width: containerWidth,
            height: 'auto',
            resizeMode: 'cover',
          },
          container: {height: '100%', width: '100%'},
        }}
        data={fieldState.getDisplayableProperties()}
        coverScreen={true}
        horizontal={true}
        remove={decidePropertyPictureRemovalMethod()}
      />
    </View>
  );
};

export default ImagePickerContent;
