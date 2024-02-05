/* istanbul ignore file */
import SessionManager from '../../utilities/errors/backend/SessionManager';
import {PasswordlessUserBackend, UserBackend} from '../../types/service/server';
import User from '../../types/User';
import ENDPOINTS from '../endpoints';
import ReduxProps from '../../types/redux/props';
import {convertToFrontendUserFormat} from '../../utilities/adapters/User';

export const retrieveAllUsers = (
  props: ReduxProps,
): Promise<PasswordlessUserBackend['user'][]> => {
  return new SessionManager<
    undefined,
    PasswordlessUserBackend['user'][],
    PasswordlessUserBackend['user'][]
  >(undefined, ENDPOINTS.USER.RETRIEVE, 'GET', props, user => user).query();
};

export const requestSpecificUser = (
  id: number,
  props: ReduxProps,
): Promise<User> => {
  return new SessionManager<undefined, UserBackend, User>(
    undefined,
    `${ENDPOINTS.USER.PROFILE}${id}/`,
    'GET',
    props,
    user => convertToFrontendUserFormat(user),
  ).query();
};

export const deleteUser = (props: ReduxProps) => {
  return new SessionManager<undefined, void, void>(
    undefined,
    ENDPOINTS.USER.PROFILE,
    'DELETE',
    props,
    undefined,
  ).query();
};
