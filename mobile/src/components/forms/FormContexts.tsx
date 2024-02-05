import React from 'react';
import {FormTypes} from '../../types/components/forms/BaseForm';
import FormContextProps from '../../types/components/forms/FormContext';
import {getFormType} from '../../types/components/forms/FormField';

const FormContexts: Map<
  FormTypes,
  React.Context<FormContextProps | null>
> = new Map();

for (const formTypeKey in FormTypes) {
  const formType = FormTypes[formTypeKey as keyof typeof FormTypes];
  FormContexts.set(
    formType,
    React.createContext<FormContextProps | null>(null),
  );
}

export default FormContexts;

export function getFormContext<D = any>(
  formType: FormTypes,
): React.Context<FormContextProps<D> | null> {
  return FormContexts.get(formType) as React.Context<FormContextProps | null>;
}

/**
 *
 * @type F If true, the retrieved context will be "forced" (not null).
 */
export function getSafeFormContext<F extends Boolean = true, D = any>(
  formType?: FormTypes,
) {
  type DefaultFormContext = React.Context<FormContextProps<D>>;
  type SafelyDecidedFormContext = F extends true
    ? DefaultFormContext
    : DefaultFormContext | null;
  return getFormContext<D>(getFormType(formType)) as SafelyDecidedFormContext;
}
