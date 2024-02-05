/* istanbul ignore file */
import {AuthConfiguration} from 'react-native-app-auth';
import OAuthenticator from './OAuthenticator';
import Config from 'react-native-config';

export default class GitHubAuthenticator extends OAuthenticator {
  public constructor() {
    super('github');
  }

  public getBackendServiceName(): string {
    return 'GITHUB';
  }

  protected getConfiguration(): AuthConfiguration {
    return {
      redirectUrl: OAuthenticator.REDIRECTION,
      clientId: Config.GITHUB_CLIENT_ID,
      clientSecret: Config.GITHUB_CLIENT_SECRET,
      scopes: ['offline_access', 'identity', 'email'],
      additionalHeaders: {Accept: 'application/json'},
      serviceConfiguration: {
        authorizationEndpoint: 'https://github.com/login/oauth/authorize',
        tokenEndpoint: 'https://github.com/login/oauth/access_token',
        revocationEndpoint: `https://github.com/settings/connections/applications/${Config.GITHUB_CLIENT_ID}`,
      },
    };
  }
}
