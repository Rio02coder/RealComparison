import {Reducer} from 'redux';
import UserAction, {UserActions} from '../../types/redux/actions/user';
import User from '../../types/User';
import login from '../../utilities/storage/session/login';
import logout from '../../utilities/storage/session/logout';

export type ReducerType = Reducer<User | null, UserAction<User | null>>;

const reducer: ReducerType = (state = null, action): User | null => {
  switch (action.type) {
    case UserActions.LOGIN:
      const justLoggedInUser = action.payload as User;
      login(justLoggedInUser.token);
      return justLoggedInUser;
    case UserActions.UPDATE:
      return {...state, ...action.payload} as User;
    case UserActions.LOGOUT:
      logout();
      return null;
    default:
      return state;
  }
};

export default reducer;
