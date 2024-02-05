import FormProps from '../Form';

export default interface IsolatedFormProps<T = any, F = any, S = any>
  extends FormProps<any, T, F, S> {
  editorStyle?: FormProps<any, T, F, S>['style'];
  deactivated?: boolean;
};
