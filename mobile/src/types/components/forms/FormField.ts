import BaseFormProps, {FormTypes} from './BaseForm';

export const getFormType = (formType: FormTypes | undefined): FormTypes =>
  formType ? formType : FormTypes.LOGIN;

export default interface FormField {
  formType?: FormTypes;
  /**
   * If provided, this field should react to a user interaction on itself with this overriding action.
   */
  overridingAction?: BaseFormProps['overridingAction'];
}
