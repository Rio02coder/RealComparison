import {ReactNode} from 'react';
import {StyleProp, TextStyle, ViewStyle} from 'react-native';
import RequireAtLeastOne from '../../../RequireAtLeastOne';
import FormField from '../FormField';
import {CountryCode} from '../../../CountryCode/countryCode';
import InputTypePayloads from './InputTypePayloads';

export type InputStyle = RequireAtLeastOne<{
  container: StyleProp<ViewStyle>;
  text: StyleProp<TextStyle>;
  icon: StyleProp<TextStyle>;
}>;

export interface Phone {
  phone: boolean | false;
  countryCode?: CountryCode;
  phonePrefix?: string;
}

export enum InputType {
  TEXT = 'TEXT',
  PHONE = 'PHONE',
  IMAGE_PICKER = 'IMAGE_PICKER',
  SWITCH = 'SWITCH',
  STRING_PICKER = 'STRING_PICKER',
}

export default interface InputProps<inputType extends InputType>
  extends FormField {
  name: string;
  inputType: inputType;
  styles?: InputStyle;
  props: InputTypePayloads[inputType];
  label?: ReactNode;
  notEditable?: boolean;
  hasNoError?: boolean;
}
