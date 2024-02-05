import React, {ReactElement, Ref, useEffect, useState} from 'react';
import {Formik, FormikHandlers, FormikProps} from 'formik';
import {
  Keyboard,
  ScrollView,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import BaseFormProps, {Querier} from '../../types/components/forms/BaseForm';
import {getFormContext} from './FormContexts';
import styles from '../../styles/defaults/containers/Form';
import {
  AdditionalFieldsData,
  FormErrors,
} from '../../types/components/forms/FormContext';
import enhanceFormValues from '../../utilities/validation/forms/Enhancement';
import getLoadingSafeAwaiter from '../../utilities/getLoadingSafeAwaiter';

const BaseForm = React.forwardRef(ReferencedBaseForm) as <
  D = any,
  T = any,
  F = any,
  S = D,
>(
  props: BaseFormProps<D, T, F, S> & {ref?: Ref<FormikProps<D>>},
) => ReactElement;

function ReferencedBaseForm<D = any, T = any, F = any, S = D>(
  props: BaseFormProps<D, T, F, S>,
  ref: Ref<FormikProps<D>>,
) {
  const FormContext = getFormContext<D>(props.name);
  let handleSubmit: FormikHandlers['handleSubmit'] | undefined;
  const [errors, setErrors] = useState<FormErrors<D>>({});
  const [additionalData, setAdditionalData] = useState<AdditionalFieldsData<D>>(
    new Map(),
  );
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    if (props.shouldSubmit && handleSubmit) {
      handleSubmit();
    }
  }, [handleSubmit, props.shouldSubmit]);

  return (
    <Formik<D>
      innerRef={ref}
      initialValues={props.initialValues}
      validationSchema={props.validationSchema}
      onSubmit={(notEnhancedForm, formikProps) => {
        const enhancedForm = enhanceFormValues(
          {...notEnhancedForm},
          additionalData,
        );
        let submissionAwaiter: void | Promise<any> = props.submissionHandler
          .onSubmit
          ? props.submissionHandler.onSubmit(enhancedForm, formikProps)
          : (
              props.submissionHandler.requester as Querier<T, D, F, S>
            ).handler.getFormProcessor(setErrors)(
              enhancedForm,
              props.stringifiedFormat,
            );
        return getLoadingSafeAwaiter(submissionAwaiter, setLoading);
      }}>
      {(formikProps: FormikProps<D>) => {
        handleSubmit = formikProps.handleSubmit;
        return (
          <ScrollView
            testID="base_form_scroll"
            style={[styles.container, props.style]}>
            <FormContext.Provider
              value={{
                formikProps: formikProps,
                inputStyle: props.inputStyle,
                errors,
                setErrors,
                additionalData,
                setAdditionalData,
                loading,
                setLoading,
              }}>
              <TouchableWithoutFeedback
                accessible={false}
                onPress={() => Keyboard.dismiss()}>
                <View testID="base_form_view">
                  {React.Children.map(props.children, child =>
                    React.cloneElement(child, {
                      ...child.props,
                      formType: props.name,
                      overridingAction: props.overridingAction,
                      notEditable: child.props.notEditable
                        ? true
                        : props.notEditable,
                      hasNoError: child.props.hasNoError
                        ? true
                        : props.hasNoError,
                    }),
                  )}
                </View>
              </TouchableWithoutFeedback>
            </FormContext.Provider>
          </ScrollView>
        );
      }}
    </Formik>
  );
}

export default BaseForm;
