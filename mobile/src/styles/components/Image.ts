import {ImageStyle, StyleProp, StyleSheet} from 'react-native';
import {WIDTH} from '../../types/Screen';

const imageStyles = StyleSheet.create({
  image: {
    height: 250,
    width: WIDTH,
    resizeMode: 'cover',
  },
});

export default imageStyles;
