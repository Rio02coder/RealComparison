/* istanbul ignore file */
import {AuthConfiguration, authorize} from 'react-native-app-auth';
import {FormContextErrorHandler} from '../../types/components/forms/FormContext';
import User from '../../types/User';
import authentifier from './Autehntifier';

export default abstract class OAuthenticator {
  public static readonly REDIRECTION = 'com.realcomparison://oauthredirect';
  public readonly name: string;
  public readonly icon: string;

  /**
   * TypeScript is unable to get the class of an object on itself...
   */
  private static authenticatorsChain = new Array<
    [OAuthenticator, typeof OAuthenticator]
  >();

  public static getAuthenticatorsChain() {
    return OAuthenticator.authenticatorsChain;
  }

  public constructor(name: string, icon?: string) {
    this.name = name;
    this.icon = icon ? icon : name;
  }

  public abstract getBackendServiceName(): string;
  protected abstract getConfiguration(): AuthConfiguration;

  /**
   * Having been given a backend service representation of the kind of third party authentication
   * which has been used, return the used OAuthenticator in the mobile app. In the case no third
   * party authentication has been used, as this may be only a standard account, OAuthenticator
   * will get returned instead.
   */
  public static getUsedOAuthenticator(
    backendServiceFormat: string,
  ): typeof OAuthenticator {
    for (let i = 0; i < OAuthenticator.authenticatorsChain.length; i++) {
      if (
        OAuthenticator.authenticatorsChain[i][0].getBackendServiceName() ===
        backendServiceFormat
      ) {
        return OAuthenticator.authenticatorsChain[i][1];
      }
    }
    return OAuthenticator;
  }

  /**
   * Having been given a used OAuthenticator, return its backend service name representation.
   */
  public static getBackendServiceName(
    usedOAuthenticator: typeof OAuthenticator,
  ): string {
    for (let i = 0; i < OAuthenticator.authenticatorsChain.length; i++) {
      if (OAuthenticator.authenticatorsChain[i][1] === usedOAuthenticator) {
        return OAuthenticator.authenticatorsChain[i][0].getBackendServiceName();
      }
    }
    return 'REMOTE';
  }

  /**
   * The second returned function is to be executed after a successful login
   * process, to make sure the error displaying burst has been cancelled.
   */
  public async authentify(
    setErrors: FormContextErrorHandler<{}>,
  ): Promise<[Promise<User | null>, Function]> {
    const authState = await authorize(this.getConfiguration());
    return authentifier(
      {token: authState.accessToken, provider: this.name},
      setErrors,
    );
  }
}
