import React from 'react';
import {FormikErrors, FormikProps} from 'formik';
import {InputStyle} from './input/Input';

export type FormErrors<D> = FormikErrors<D> & {default?: string};

export interface StateDispatcher<State>
  extends React.Dispatch<React.SetStateAction<State>> {}

export interface FormContextErrorHandler<D>
  extends StateDispatcher<FormErrors<D>> {}

export interface AdditionalFieldDataDetails {
  isPrefix?: boolean;
}

export interface AdditionalFieldDataEnhancementContext
  extends Array<{
    data: string;
    details: AdditionalFieldDataDetails;
  }> {}

export type FormFieldEnhancementMethod = (context: {
  fieldToEnhance: string;
  enhancementContext: AdditionalFieldDataEnhancementContext;
}) => string;

export interface AdditionalFieldsData<D>
  extends Map<
    Extract<keyof D, string>,
    AdditionalFieldDataEnhancementContext
  > {}

export default interface FormContextProps<D = any> {
  formikProps: FormikProps<D>;
  inputStyle?: InputStyle;
  errors: FormErrors<D>;
  setErrors: FormContextErrorHandler<D>;
  additionalData: AdditionalFieldsData<D>;
  setAdditionalData: StateDispatcher<AdditionalFieldsData<D>>;
  loading: boolean;
  setLoading: StateDispatcher<boolean>;
}
