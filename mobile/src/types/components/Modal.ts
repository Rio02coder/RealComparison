import React from 'react';
import {StyleProp, ViewStyle} from 'react-native';
import RequireAtLeastOne from '../RequireAtLeastOne';

export default interface ModalProps {
  children: React.ReactNode;
  elementToShow?: React.ReactNode;
  style?: StyleProp<ViewStyle>;
  color: string;
  swipeThreshold: number;
  coverScreen?: boolean | false;
  onPress?: RequireAtLeastOne<{
    onEnter: Function;
    onExit: Function;
  }>;
}
