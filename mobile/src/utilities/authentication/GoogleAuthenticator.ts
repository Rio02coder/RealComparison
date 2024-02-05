/* istanbul ignore file */
import {AuthConfiguration} from 'react-native-app-auth';
import OAuthenticator from './OAuthenticator';
import Config from 'react-native-config';

export default class GoogleAuthenticator extends OAuthenticator {
  public constructor() {
    super('google');
  }

  public getBackendServiceName(): string {
    return 'GOOGLE';
  }

  protected getConfiguration(): AuthConfiguration {
    return {
      issuer: 'https://accounts.google.com',
      clientId: `${Config.GOOGLE_CLIENT_ANDROID_ID}.apps.googleusercontent.com`,
      redirectUrl: `com.googleusercontent.apps.${Config.GOOGLE_CLIENT_ANDROID_ID}:/oauth2redirect/google`,
      scopes: ['openid', 'profile'],
    };
  }
}
