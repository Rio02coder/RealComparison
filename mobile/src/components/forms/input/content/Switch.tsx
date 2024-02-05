/* istanbul ignore file */
import React, {useContext} from 'react';
import InputProps, {
  InputType,
} from '../../../../types/components/forms/input/Input';
import FormContextProps from '../../../../types/components/forms/FormContext';
import {getSafeFormContext} from '../../FormContexts';
import appStyles from '../../../../styles/screens/Themes';
import {Switch} from 'react-native-paper';
import handleFormFieldChange from '../../../../utilities/errors/handleFormFieldChange';
import {TouchableOpacity} from 'react-native';
import styles from '../../../../styles/defaults/buttons/Submit';

const SwitchContent: React.FC<InputProps<InputType.SWITCH>> = props => {
  const {formikProps, inputStyle, errors, setErrors} =
    useContext<FormContextProps>(getSafeFormContext(props.formType));

  const getState = (): boolean => formikProps.values[props.name];

  const switchState = () =>
    handleFormFieldChange(
      formikProps,
      errors,
      setErrors,
      props.name,
      !getState(),
    );
  const decidePressAction = () =>
    props.overridingAction ? props.overridingAction : switchState;
  const act = () => {
    decidePressAction()();
  };

  return (
    <TouchableOpacity testID="switch_input" onPress={() => act()}>
      <Switch
        style={inputStyle?.container}
        value={getState()}
        onChange={() => act()}
        color={styles.container.backgroundColor}
        disabled={props.notEditable || props.overridingAction !== undefined}
      />
    </TouchableOpacity>
  );
};

export default SwitchContent;
