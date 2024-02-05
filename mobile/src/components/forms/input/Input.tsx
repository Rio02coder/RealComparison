import React, {useContext} from 'react';
import {View} from 'react-native';
import FormContextProps from '../../../types/components/forms/FormContext';
import InputProps, {
  InputType,
} from '../../../types/components/forms/input/Input';
import {getSafeFormContext} from '../FormContexts';
import stylesWithoutProps from '../../../styles/defaults/fields/Input';
import ErrorNote from './ErrorNote';
import PhoneContent from './content/Phone/Phone';
import InputContent from './content/Input';
import ImagePickerContent from './content/imagePicker/ImagePicker';
import SwitchContent from './content/Switch';
import StringPicker from './content/StringPicker';

function Input<inputType extends InputType>(props: InputProps<inputType>) {
  const {inputStyle} = useContext<FormContextProps>(
    getSafeFormContext(props.formType),
  );

  const styles = stylesWithoutProps(props);

  const getInputContent = () => {
    switch (props.inputType) {
      case InputType.TEXT:
        return <InputContent {...(props as InputProps<InputType.TEXT>)} />;
      case InputType.PHONE:
        return <PhoneContent {...(props as InputProps<InputType.PHONE>)} />;
      case InputType.IMAGE_PICKER:
        return (
          <ImagePickerContent
            {...(props as InputProps<InputType.IMAGE_PICKER>)}
          />
        );
      case InputType.SWITCH:
        return <SwitchContent {...(props as InputProps<InputType.SWITCH>)} />;
      case InputType.STRING_PICKER:
        return (
          <StringPicker {...(props as InputProps<InputType.STRING_PICKER>)} />
        );
      default:
        return <></>;
    }
  };

  return (
    <View
      style={[
        styles.container,
        inputStyle?.container,
        props.styles?.container,
      ]}>
      <View testID="input_view" style={styles.content}>
        {props.label}
        {getInputContent()}
      </View>
      {!props.hasNoError && <ErrorNote {...props} />}
    </View>
  );
}

export default Input;
