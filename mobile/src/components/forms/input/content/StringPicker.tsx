import React, {useContext, useEffect, useState} from 'react';
import {TouchableOpacity as LocalTouchableOpacity} from 'react-native';
import {Dropdown} from 'react-native-element-dropdown';
import stringFilterStyle from '../../../../styles/components/search/filters/StringFilter';
import appStyles from '../../../../styles/screens/Themes';
import InputProps, {
  InputType,
} from '../../../../types/components/forms/input/Input';
import {getSafeFormContext} from '../../FormContexts';
import FormContextProps from '../../../../types/components/forms/FormContext';
import handleFormFieldChange from '../../../../utilities/errors/handleFormFieldChange';
import ModifiedDataPayload from '../../../../types/search/filters/ModifiedDataPayload';
import {TouchableOpacity as NotLocalTouchableOpacity} from 'react-native-gesture-handler';
import styles from '../../../../styles/defaults/buttons/Submit';

const StringPickerContent: React.FC<
  InputProps<InputType.STRING_PICKER>
> = props => {
  const {formikProps, inputStyle, errors, setErrors} =
    useContext<FormContextProps>(getSafeFormContext(props.formType));

  const specificProps = props.props;

  const getChoice = (): string => formikProps.values[props.name];

  const setChoice = (choice: ModifiedDataPayload<any>) =>
    handleFormFieldChange(
      formikProps,
      errors,
      setErrors,
      props.name,
      choice.value,
    );

  const hasOverridingAction = () => props.overridingAction !== undefined;
  const canLocallyUseInput = () => !hasOverridingAction();

  const ActivitySpecificTouchableOpacity = () =>
    canLocallyUseInput() ? LocalTouchableOpacity : NotLocalTouchableOpacity;

  const TouchableOpacity = ActivitySpecificTouchableOpacity();

  // useEffect(
  //   () =>
  //     console.log(
  //       'set StringPicker state!!',
  //       specificProps.data,
  //       getChoice().value,
  //     ),
  //   [specificProps, getChoice],
  // );

  return (
    <TouchableOpacity
      testID="picker_input"
      style={[inputStyle?.container, inputStyle?.container]}
      onPress={() => (props.overridingAction as Function)()}
      disabled={canLocallyUseInput()}>
      {specificProps.icon && (
        <TouchableOpacity style={[inputStyle?.icon, props.styles?.icon]}>
          {specificProps.icon}
        </TouchableOpacity>
      )}
      <Dropdown
        data={specificProps.data}
        disable={!canLocallyUseInput() || props.notEditable}
        value={getChoice()}
        style={[stringFilterStyle.dropdown, props.styles?.text]}
        placeholderStyle={[stringFilterStyle.placeHolder, props.styles?.text]}
        selectedTextStyle={[stringFilterStyle.placeHolder, props.styles?.text]}
        containerStyle={stringFilterStyle.container}
        activeColor={styles.container.backgroundColor}
        dropdownPosition={'auto'}
        labelField={'label'}
        valueField={'value'}
        onChange={setChoice}
      />
    </TouchableOpacity>
  );
};

export default StringPickerContent;
