import {IconProps} from 'react-native-vector-icons/Icon';
import {StyleProp, TextStyle} from 'react-native';
import RequireAtLeastOne from '../../../../../RequireAtLeastOne';

export default interface ImageSubmissionTypeProps {
  choose: Function;
  icon: IconProps['name'];
  caption: string;
  styles?: RequireAtLeastOne<{
    icon: StyleProp<TextStyle>;
    caption: StyleProp<TextStyle>;
  }>;
};
