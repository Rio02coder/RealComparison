import {StyleSheet} from 'react-native';
import AnimationHeaderProps from '../../../types/components/property/AnimationHeader';
import styles from '../../defaults/buttons/Submit';

const AnimatedHeaderStyles = (props: AnimationHeaderProps) =>
  StyleSheet.create({
    container: {
      backgroundColor: styles.container.backgroundColor,
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      overflow: 'hidden',
      height: props.heigth,
      // @ts-ignore
      transform: [{translateY: props.headerTranslateY}],
      // @ts-ignore
      opacity: props.opacity,
    },
  });

export default AnimatedHeaderStyles;
