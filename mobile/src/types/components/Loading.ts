import {
  ImageSourcePropType,
  ImageStyle,
  StyleProp,
  TextStyle,
  ViewStyle,
} from 'react-native';
import RequireAtLeastOne from '../RequireAtLeastOne';

export default interface LoadingProps {
  /**
   * Custom styles to applied to the base building blocks of this component.
   */
  styles?: RequireAtLeastOne<{
    container: StyleProp<ViewStyle>;
    animation: StyleProp<ImageStyle>;
    description: StyleProp<TextStyle>;
  }>;
  /**
   * If mentioned, the loading component will have a background space, in which
   * this textual description will be found.
   */
  description?: string;
  /**
   * A custom GIF animation for the loading screen.
   */
  source?: ImageSourcePropType;
}
