import {StyleProp, TextStyle, ViewStyle} from 'react-native';
import OAuthenticator from '../../../utilities/authentication/OAuthenticator';
import RequireAtLeastOne from '../../RequireAtLeastOne';
import User from '../../User';
import {FormContextErrorHandler} from '../forms/FormContext';

export type OAuthProviderStyle = RequireAtLeastOne<{
  container: StyleProp<ViewStyle>;
  icon: StyleProp<TextStyle>;
}>;

export default interface OAuthProviderProps {
  authenticator: OAuthenticator;
  style?: OAuthProviderStyle;
  setErrors: FormContextErrorHandler<{}>;
  completeLoginProcess: (loggedUser: User) => Promise<void>;
}
