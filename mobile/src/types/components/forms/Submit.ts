import React from 'react';
import {StyleProp, ViewStyle} from 'react-native';
import FormField from './FormField';

export default interface SubmitProps extends FormField {
  style?: StyleProp<ViewStyle>;
  children?: React.ReactNode;
  isHiddenWhileLoading?: boolean;
  testID?: string;
}
