import React from 'react';
import ImageSliderSubmitProps from '../../../../types/components/forms/standalone/imagePicker/Submit';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Submit from '../../Submit';

const ImageSliderSubmit: React.FC<ImageSliderSubmitProps> = ({
  canSubmit,
  formType,
}) =>
  canSubmit ? (
    <Submit
      isHiddenWhileLoading
      formType={formType}
      style={{
        backgroundColor: 'rgba(42,42,42,0.5)',
        padding: 2.5,
      }}>
      <Icon style={{fontSize: 25, color: 'white'}} name={'update'} />
    </Submit>
  ) : null;

export default ImageSliderSubmit;
