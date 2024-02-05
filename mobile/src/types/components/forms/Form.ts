import {ObjectShape} from 'yup/lib/object';
import BaseFormProps from './BaseForm';

export type FormDataType = {[key: string]: string};

export default interface FormProps<D = any, T = any, F = any, S = D>
  extends BaseFormProps<D, T, F, S> {
  validationRules: ObjectShape;
}
