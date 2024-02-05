import User from '../src/types/User';
import {SessionTokens} from '../src/types/utilities/storage/Session';
import OAuthenticator from '../src/utilities/authentication/OAuthenticator';
import UnsplashAuthenticator from '../src/utilities/authentication/UnsplashAuthenticator';

const token: SessionTokens = {
  access: 'access_token',
  refresh: 'refresh_token',
};

const mockUser: User = {
  firstName: 'John',
  lastName: 'Doe',
  email: 'john.doe@example.com',
  phone: '+447437025829',
  token,
  service: OAuthenticator,
};

export default mockUser;
