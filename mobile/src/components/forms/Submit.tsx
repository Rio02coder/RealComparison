import React, {useContext} from 'react';
import {Text, View, TouchableOpacity} from 'react-native';
import FormContextProps from '../../types/components/forms/FormContext';
import {getFormType} from '../../types/components/forms/FormField';
import SubmitProps from '../../types/components/forms/Submit';
import {getFormContext} from './FormContexts';
import submitButtonStyles from '../../styles/defaults/buttons/Submit';
import WaitingNotice from './WaitingNotice';

const Submit: React.FC<SubmitProps> = props => {
  let formType = getFormType(props.formType);
  const FormContext = getFormContext(
    formType,
  ) as React.Context<FormContextProps>;
  let {
    formikProps: {handleSubmit, errors, values},
    loading,
  } = useContext(FormContext);
  let additionalErrors = useContext(FormContext).errors;

  const areThereNoFormErrors = (): boolean =>
    Object.keys({...errors, ...additionalErrors}).length == 0;

  const haveNoFieldsBeenCompleted = (): boolean =>
    !Object.values(values).some(value => value !== '');

  const canSubmit = (): boolean =>
    areThereNoFormErrors() && !haveNoFieldsBeenCompleted();

  const shouldHideInCurrentLoadingState = () =>
    props.isHiddenWhileLoading === true && loading;

  const canDisplayInCurrentLoadingState = () =>
    !shouldHideInCurrentLoadingState();

  return (
    <View testID={props.testID}>
      {/*
       * If provided, the form is forced to implement custom actions in its inputs instead, therefore a submit button
       * should not be rendered, to keep consistency across the possible form actions at any given point.
       */}
      {!props.overridingAction && canDisplayInCurrentLoadingState() && (
        <TouchableOpacity
          style={[
            {
              borderRadius: submitButtonStyles.container.borderRadius,
              opacity: !canSubmit() ? 0.5 : 1,
              alignSelf: 'center',
            },
            props.style,
          ]}
          disabled={!canSubmit()}
          onPress={handleSubmit}>
          {props.children && props.children}
          {!props.children && (
            <View style={[submitButtonStyles.container]}>
              <Text style={submitButtonStyles.text}>{formType}</Text>
            </View>
          )}
        </TouchableOpacity>
      )}
      {!props.overridingAction && (
        <WaitingNotice loading={loading} error={additionalErrors.default} />
      )}
    </View>
  );
};

export default Submit;
