import {
  ImageRequireSource,
  ImageStyle,
  StyleProp,
  ViewStyle,
} from 'react-native';
import RequireAtLeastOne from '../../RequireAtLeastOne';

type ImageSliderModalProps = {
  data: (string | ImageRequireSource)[];
  styles?: RequireAtLeastOne<{
    container: StyleProp<ViewStyle>;
    preview: StyleProp<ImageStyle>;
  }>;
  coverScreen: boolean;
  horizontal: boolean | true;
  remove?: (imageIndex: number) => void;
};

export default ImageSliderModalProps;
