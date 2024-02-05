import {Animated} from 'react-native';

export default interface AnimationHeaderProps {
  headerTranslateY: Animated.AnimatedInterpolation;
  opacity: Animated.AnimatedInterpolation;
  heigth: number;
}
