import {ImageRequireSource, ImageStyle, StyleProp} from 'react-native';

export default interface DynamicImageComponentProps {
  uri: string | ImageRequireSource;
  animated?: boolean;
  style?: StyleProp<ImageStyle>;
  remove?: Function;
  helper?: boolean;
  move: {
    next: Function | null;
    back: Function | null;
  };
};
