import React from 'react';
import {Animated} from 'react-native';
import AnimationHeaderProps from '../../types/components/property/AnimationHeader';
import StylesWithoutProps from '../../styles/components/headers/AnimatedHeader';

const AnimatedHeader = (props: AnimationHeaderProps) => {
  const styles = StylesWithoutProps(props);
  return <Animated.View style={styles.container} />;
};

export default AnimatedHeader;
