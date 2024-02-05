import React, {useContext, useState} from 'react';
import {
  Platform,
  TextInput,
  TouchableOpacity as AndroidTouchableOpacity,
} from 'react-native';
import InputProps, {
  InputType,
} from '../../../../types/components/forms/input/Input';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {getSafeFormContext} from '../../FormContexts';
import FormContextProps from '../../../../types/components/forms/FormContext';
import styles from '../../../../styles/defaults/fields/InputContent';
import {TouchableOpacity as iOSTouchableOpacity} from 'react-native-gesture-handler';
import handleFormFieldChange from '../../../../utilities/errors/handleFormFieldChange';

const PlatformSpecificTouchableOpacity = () =>
  Platform.OS === 'ios' ? iOSTouchableOpacity : AndroidTouchableOpacity;

const InputContent: React.FC<InputProps<InputType.TEXT>> = props => {
  const {formikProps, inputStyle, errors, setErrors} =
    useContext<FormContextProps>(getSafeFormContext(props.formType));

  const specificProps = props.props;

  const [isInputVisible, setIsInputVisible] = useState<boolean>(
    !specificProps?.secure,
  );

  const decideNextVisibilitySwap = (): boolean =>
    !specificProps?.secure || !isInputVisible;

  const handleVisibilityRequest = () =>
    setIsInputVisible(decideNextVisibilitySwap());

  const getCurrentIconColor = () =>
    specificProps?.secure && isInputVisible ? 'red' : undefined;

  const hasOverridingAction = () => props.overridingAction !== undefined;
  const canLocallyUseInput = () => !hasOverridingAction();

  const TouchableOpacity = PlatformSpecificTouchableOpacity();
  const getEnforcedContentFormat = (newInput: string | number) => {
    switch (specificProps.keyboard) {
      case 'numeric':
        return Number(newInput);
      default:
        return newInput;
    }
  };

  return (
    <TouchableOpacity
      disabled={canLocallyUseInput()}
      onPress={() => (props.overridingAction as Function)()}
      style={[styles.input, props.styles?.text]}>
      {specificProps?.icon && (
        <TouchableOpacity
          style={styles.iconContainer}
          onPress={handleVisibilityRequest}>
          <Icon
            style={[
              inputStyle?.icon,
              styles.icon,
              {color: getCurrentIconColor()},
            ]}
            name={specificProps?.icon}
          />
        </TouchableOpacity>
      )}
      <TextInput
        testID="text_input"
        editable={canLocallyUseInput() && !props.notEditable}
        style={[styles.text, inputStyle?.text, props?.styles?.text]}
        placeholderTextColor={'#868686'}
        onChangeText={text =>
          handleFormFieldChange(
            formikProps,
            errors,
            setErrors,
            props.name,
            getEnforcedContentFormat(text),
          )
        }
        onBlur={formikProps.handleBlur(props.name)}
        placeholder={specificProps?.placeholder}
        value={formikProps.values[props.name]}
        secureTextEntry={!isInputVisible}
        autoCorrect={false}
        autoCapitalize={'none'}
        keyboardType={specificProps?.keyboard}
      />
    </TouchableOpacity>
  );
};

export default InputContent;
