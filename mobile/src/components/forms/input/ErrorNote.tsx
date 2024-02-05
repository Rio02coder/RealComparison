import React, {useContext} from 'react';
import {Text} from 'react-native';
import styles from '../../../styles/defaults/fields/ErrorNote';
import FormContextProps from '../../../types/components/forms/FormContext';
import InputProps, {
  InputType,
} from '../../../types/components/forms/input/Input';
import {getSafeFormContext} from '../FormContexts';

const ErrorNote: React.FC<InputProps<InputType>> = props => {
  const {formikProps, errors} = useContext<FormContextProps>(
    getSafeFormContext(props.formType),
  );

  return (
    <Text style={styles.error}>
      {formikProps.errors[props.name]
        ? formikProps.errors[props.name]
        : errors[props.name]
        ? errors[props.name]
        : ''}
    </Text>
  );
};

export default ErrorNote;
