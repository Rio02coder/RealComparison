/* istanbul ignore file */
import {AuthConfiguration} from 'react-native-app-auth';
import OAuthenticator from './OAuthenticator';
import Config from 'react-native-config';

export default class UnsplashAuthenticator extends OAuthenticator {
  public constructor() {
    super('unsplash');
  }

  public getBackendServiceName(): string {
    return 'UNSPLASH';
  }

  protected getConfiguration(): AuthConfiguration {
    return {
      usePKCE: false,
      redirectUrl: OAuthenticator.REDIRECTION,
      clientId: Config.UNSPLASH_CLIENT_ID,
      clientSecret: Config.UNSPLASH_CLIENT_SECRET,
      scopes: ['public', 'read_user'],
      serviceConfiguration: {
        authorizationEndpoint: 'https://unsplash.com/oauth/authorize',
        tokenEndpoint: 'https://unsplash.com/oauth/token',
      },
    };
  }
}
