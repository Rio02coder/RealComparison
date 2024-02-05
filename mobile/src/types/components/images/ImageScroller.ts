import {ImageRequireSource, ImageStyle, StyleProp} from 'react-native';
import ImageSliderModalProps from './ImageSliderModal';

type ImageScrollerProps = {
  data: (string | ImageRequireSource)[];
  animated: boolean;
  style?: StyleProp<ImageStyle>;
  remove?: ImageSliderModalProps['remove'];
  helper?: boolean;
};

export default ImageScrollerProps;
