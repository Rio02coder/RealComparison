import React, {ReactElement, Ref} from 'react';
import {InferType, object} from 'yup';
import FormProps from '../../types/components/forms/Form';
import {FormikProps} from 'formik';
import BaseForm from './BaseForm';

const Form = React.forwardRef(ReferencedForm) as <T = any, F = any, S = any>(
  props: FormProps<any, T, F, S> & {ref?: Ref<FormikProps<any>>},
) => ReactElement;

function ReferencedForm<T = any, F = any, S = any>(
  props: FormProps<any, T, F, S>,
  ref: Ref<FormikProps<any>>,
) {
  const formEntitySchema = object(props.validationRules);
  interface FormEntity extends InferType<typeof formEntitySchema> {}
  const formEntityValidationSchema = formEntitySchema.shape(
    props.validationRules,
  );
  return (
    <BaseForm<FormEntity, T, F, S>
      ref={ref}
      validationSchema={formEntityValidationSchema}
      {...props}>
      {props.children}
    </BaseForm>
  );
}

export default Form;
