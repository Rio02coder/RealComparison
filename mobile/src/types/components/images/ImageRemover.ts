import DynamicImageComponentProps from './DynamicImageComponent';
import {StyleProp, TextStyle, ViewStyle} from 'react-native';
import RequireAtLeastOne from '../../RequireAtLeastOne';

export default interface ImageRemoverProps {
  remove: NonNullable<DynamicImageComponentProps['remove']>;
  styles?: RequireAtLeastOne<{
    container: StyleProp<ViewStyle>;
    icon: StyleProp<TextStyle>;
  }>;
};
