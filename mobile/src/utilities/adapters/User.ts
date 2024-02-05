import {PasswordlessUserBackend, UserBackend} from '../../types/service/server';
import User from '../../types/User';
import {SessionTokens} from '../../types/utilities/storage/Session';
import OAuthenticator from '../authentication/OAuthenticator';

export const convertToRawBackendUserFormat = (
  ...args: Parameters<typeof convertToBackendUserFormat>
): UserBackend['user'] => convertToBackendUserFormat(...args).user;

export const convertToBackendUserFormat = (
  frontendUserFormat: User,
  password: string,
): UserBackend => {
  const passwordlessUser =
    convertToPasswordlessBackendUserFormat(frontendUserFormat);
  return {
    ...passwordlessUser,
    user: {...passwordlessUser.user, password: password},
  };
};

export const convertToPasswordlessBackendUserFormat = (
  frontendUserFormat: User,
): PasswordlessUserBackend => ({
  token: frontendUserFormat.token,
  user: {
    first_name: frontendUserFormat.firstName,
    last_name: frontendUserFormat.lastName,
    phone_number: frontendUserFormat.phone,
    email: frontendUserFormat.email,
    service: OAuthenticator.getBackendServiceName(frontendUserFormat.service),
  },
});

export function convertToFrontendUserFormat<isRaw extends Boolean = false>(
  backendUserFormat: isRaw extends true
    ? PasswordlessUserBackend['user']
    : PasswordlessUserBackend,
): User {
  const rawBackendUser: PasswordlessUserBackend['user'] = backendUserFormat.user
    ? backendUserFormat.user
    : (backendUserFormat as PasswordlessUserBackend['user']);
  return {
    firstName: rawBackendUser.first_name,
    lastName: rawBackendUser.last_name,
    phone: rawBackendUser.phone_number,
    email: rawBackendUser.email,
    token: backendUserFormat.token as SessionTokens,
    service: OAuthenticator.getUsedOAuthenticator(rawBackendUser.service),
  };
}
