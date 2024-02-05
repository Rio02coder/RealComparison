import {HEADER_SCROLL_DISTANCE} from '../../types/Screen';
import {Platform} from 'react-native';
import AnimatedHeader from './AnimationHeader';
import React from 'react';
import AnimatedPropertyHeaderProps from '../../types/components/Headers/AnimatedPropertyHeader';

const AnimatedPropertyHeader: React.FC<AnimatedPropertyHeaderProps> = ({
  scrollY,
}) => (
  <AnimatedHeader
    headerTranslateY={scrollY.interpolate({
      inputRange: [0, HEADER_SCROLL_DISTANCE],
      outputRange: [0, -HEADER_SCROLL_DISTANCE],
      extrapolate: 'clamp',
    })}
    opacity={scrollY.interpolate({
      inputRange: [0, HEADER_SCROLL_DISTANCE],
      outputRange: [0, 1],
      extrapolate: 'clamp',
    })}
    heigth={Platform.OS === 'ios' ? 125 : 120}
  />
);

export default AnimatedPropertyHeader;
