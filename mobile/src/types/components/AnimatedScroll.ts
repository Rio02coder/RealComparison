import React from 'react';
import {Animated} from 'react-native';

export default interface AnimatedScrollProps {
  scrollY: Animated.Value;
  children: React.ReactElement[];
}
