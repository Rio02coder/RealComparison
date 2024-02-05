import React, {useContext, useRef, useEffect} from 'react';
import PhoneInput, {PhoneInputState} from 'react-native-phone-number-input';
import stylesWithoutProps from '../../../../../styles/defaults/buttons/Phone';
import {getSafeFormContext} from '../../../FormContexts';
import FormContextProps from '../../../../../types/components/forms/FormContext';
import {TextInputProps, TouchableOpacity} from 'react-native';
import InputProps, {
  InputType,
} from '../../../../../types/components/forms/input/Input';
import handleFormFieldChange from '../../../../../utilities/errors/handleFormFieldChange';
import contextlessKeepReferenceInSyncWithFormState from './keepReferenceInSyncWithFormState';

const PhoneContent: React.FC<InputProps<InputType.PHONE>> = props => {
  const {formikProps, errors, setErrors, setAdditionalData} =
    useContext<FormContextProps>(getSafeFormContext(props.formType));

  const styles = stylesWithoutProps(props);
  const phoneInput = useRef<PhoneInput>(null);

  const specificProps = props.props;

  const keepReferenceInSyncWithFormState = () =>
    contextlessKeepReferenceInSyncWithFormState(
      phoneInput.current,
      formikProps,
      props.name,
    );

  useEffect(keepReferenceInSyncWithFormState, [formikProps.values, props.name]);

  const shouldPhoneFieldDisplayValidityError = (
    currentPhone: string,
  ): boolean => {
    const phone = phoneInput.current?.state as Readonly<PhoneInputState>;
    const phoneNumber = `${phone.code}${currentPhone}`;
    const isNumberValid = phoneInput.current?.isValidNumber(
      phoneNumber,
    ) as boolean;
    return !isNumberValid && !errors[props.name];
  };

  const handlePossibleInvalidPhoneError = (currentPhone: string) => {
    if (shouldPhoneFieldDisplayValidityError(currentPhone)) {
      setErrors(previousErrors => {
        const currentErrors = previousErrors;
        currentErrors[props.name] = 'Phone must be valid';
        return currentErrors;
      });
    }
  };

  const savePhonePrefix = (prefix: string) => {
    setAdditionalData(previousAdditionalData => {
      const updatedAdditionalData = previousAdditionalData;
      updatedAdditionalData.set(props.name, [
        {data: prefix, details: {isPrefix: true}},
      ]);
      return updatedAdditionalData;
    });
  };

  const getOnChangeTextHandler = (
    isPhoneInput: boolean,
  ): TextInputProps['onChangeText'] => {
    return function handleOnChangeText(text) {
      handleFormFieldChange(formikProps, errors, setErrors, props.name, text);
      if (isPhoneInput) {
        handlePossibleInvalidPhoneError(text);
      }
    };
  };

  useEffect(
    () =>
      savePhonePrefix(
        props.props.phone.phonePrefix ? props.props.phone.phonePrefix : '44',
      ),
    [],
  );

  const hasOverridingAction = () => props.overridingAction !== undefined;
  const canLocallyUseInput = () => !hasOverridingAction();

  return (
    <TouchableOpacity
      onPress={() => (props.overridingAction as Function)()}
      disabled={canLocallyUseInput()}>
      <PhoneInput
        disabled={!canLocallyUseInput() || props.notEditable}
        ref={phoneInput}
        value={formikProps.values[props.name]}
        onChangeText={getOnChangeTextHandler(true)}
        onChangeCountry={country => savePhonePrefix(country.callingCode[0])}
        containerStyle={styles.container}
        flagButtonStyle={styles.flagButtonView}
        textContainerStyle={styles.textContainer}
        withDarkTheme
        placeholder={specificProps?.placeholder}
        textInputStyle={styles.textInputStyle}
        codeTextStyle={styles.codeText}
        defaultCode={
          props.props.phone.countryCode ? props.props.phone.countryCode : 'GB'
        }
      />
    </TouchableOpacity>
  );
};

export default PhoneContent;
