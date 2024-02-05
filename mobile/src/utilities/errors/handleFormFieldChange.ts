import {
  FormContextErrorHandler,
  FormErrors,
} from '../../types/components/forms/FormContext';
import clearUIError from './clearUIError';
import {FormikProps} from 'formik';

const handleFormFieldChange = <FieldType extends any>(
  formikProps: FormikProps<any>,
  errors: FormErrors<any>,
  setErrors: FormContextErrorHandler<any>,
  fieldToUpdate: string,
  newFieldValue: FieldType,
) => {
  clearUIError(errors, setErrors);
  // formikProps.handleChange(fieldToUpdate)(newFieldValue);
  const newSafeFieldValue =
    typeof newFieldValue === 'number' ? String(newFieldValue) : newFieldValue;
  formikProps.setFieldValue(fieldToUpdate, newSafeFieldValue, true);
};

export default handleFormFieldChange;
