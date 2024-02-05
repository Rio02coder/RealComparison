import {
  ImageResizeMode,
  ImageSourcePropType,
  ImageStyle,
  StyleProp,
} from 'react-native';

export default interface ImageProps {
  source: ImageSourcePropType;
  heigth?: number | string;
  width?: number | string;
  resizeMode?: ImageResizeMode | 'cover';
  marginHorizontal?: number;
  marginVertical?: number;
  marginTop?: number;
  marginBottom?: number;
  marginLeft?: number;
  marginRight?: number;
  absolute?: boolean | true;
  opacity?: number;
  testID?: string;
  style?: StyleProp<ImageStyle>;
}
