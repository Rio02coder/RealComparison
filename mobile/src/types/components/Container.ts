import React from 'react';
import {StyleProp, ViewStyle} from 'react-native';

export default interface ContainerProps {
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
};
