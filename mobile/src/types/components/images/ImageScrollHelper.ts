import ImageRemoverProps from './ImageRemover';
import {IconProps} from 'react-native-vector-icons/Icon';
import DynamicImageComponentProps from './DynamicImageComponent';

export default interface ImageScrollHelperProps {
  styles?: ImageRemoverProps['styles'];
  icon: IconProps['name'];
  move:
    | DynamicImageComponentProps['move']['next']
    | DynamicImageComponentProps['move']['back'];
};
