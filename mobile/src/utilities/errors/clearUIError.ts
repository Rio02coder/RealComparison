import {
  FormContextErrorHandler,
  FormErrors,
} from '../../types/components/forms/FormContext';

/**
 * If there are no logical form related errors, this method makes sure they are visually removed from the UI too.
 * @param errors The current logical form related errors.
 * @param setErrors The visual handler of errors in the UI.
 */
const clearUIError = (
  errors: FormErrors<any>,
  setErrors: FormContextErrorHandler<any>,
) => {
  if (errors !== {}) {
    setErrors({});
  }
};

export default clearUIError;
