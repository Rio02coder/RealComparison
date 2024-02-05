/* istanbul ignore file */
import {AuthConfiguration} from 'react-native-app-auth';
import OAuthenticator from './OAuthenticator';
import Config from 'react-native-config';

export default class UberAuthenticator extends OAuthenticator {
  public constructor() {
    super('uber');
  }

  public getBackendServiceName(): string {
    return 'UBER';
  }

  protected getConfiguration(): AuthConfiguration {
    return {
      clientId: Config.UBER_CLIENT_ID,
      clientSecret: Config.UBER_CLIENT_SECRET,
      redirectUrl: 'com.realcomparison://callback',
      scopes: ['profile'],
      serviceConfiguration: {
        authorizationEndpoint: 'https://login.uber.com/oauth/v2/authorize',
        tokenEndpoint: 'https://login.uber.com/oauth/v2/token',
        revocationEndpoint: 'https://login.uber.com/oauth/v2/revoke',
      },
    };
  }
}
