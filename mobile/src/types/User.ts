import {SessionTokens} from './utilities/storage/Session';
import OAuthenticator from '../utilities/authentication/OAuthenticator';

export default interface User {
  lastName: string;
  firstName: string;
  email: string;
  phone?: string;
  token: SessionTokens;
  service: typeof OAuthenticator;
}
