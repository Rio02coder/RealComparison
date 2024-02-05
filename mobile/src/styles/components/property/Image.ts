import {StyleSheet} from 'react-native';
import ImageProps from '../../../types/components/images/Image';

const propertyImageStyle = (props: ImageProps) =>
  StyleSheet.create({
    image: {
      width: props.width,
      height: props.heigth,
      borderRadius: 10,
      marginHorizontal: props.marginHorizontal,
      marginVertical: props.marginVertical,
      marginTop: props.marginTop,
      marginBottom: props.marginBottom,
      marginLeft: props.marginLeft,
      marginRight: props.marginRight,
      resizeMode: props.resizeMode,
      position: props.absolute ? 'absolute' : 'relative',
      opacity: props.opacity,
    },
  });

export default propertyImageStyle;
