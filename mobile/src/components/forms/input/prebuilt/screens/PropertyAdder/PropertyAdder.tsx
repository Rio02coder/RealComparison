import React from 'react';
import {Platform} from 'react-native';
import DefaultInputLabel from '../../../labels/Default';
import Input from '../../../Input';
import PropertyAdderInputProps, {
  SupportedInputs,
} from '../../../../../../types/components/forms/input/prebuilt/screens/PropertyAdder';
import {wp} from '../../../../../../types/Screen';
import {InputType} from '../../../../../../types/components/forms/input/Input';

function PropertyAdderInput<inputType extends SupportedInputs>(
  inputProps: PropertyAdderInputProps<inputType>,
) {
  return (
    // @ts-ignore
    <Input
      styles={{
        container: {width: '95%'},
        text: {width: wp(45), padding: Platform.OS === 'android' ? 0 : 2},
      }}
      label={
        <DefaultInputLabel
          styles={{
            container: {width: '45%'},
            text: {color: 'white', fontSize: 12},
            icon: {color: 'white'},
          }}
          icon={inputProps.icon}
          content={inputProps.description}
        />
      }
      props={
        inputProps.inputType === InputType.STRING_PICKER
          ? {...inputProps.props}
          : {}
      }
      {...inputProps}
    />
  );
}

export default PropertyAdderInput;
