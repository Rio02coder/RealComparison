import {StyleProp, ViewStyle} from 'react-native';
import OAuthProviderProps from './OAuthProvider';

export default interface OAuthProvidersProps {
  containerStyle?: StyleProp<ViewStyle>;
  providerStyle?: OAuthProviderProps['style'];
  completeLoginProcess: OAuthProviderProps['completeLoginProcess'];
}
