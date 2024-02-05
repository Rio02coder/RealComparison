import User from '../../../types/User';
import {ScreenProps} from '../../../types/Screen';
import {ScreenNames} from '../../../types/ScreenNames';
import mountCoreScreen from './mountCoreScreen';

const completeLoginProcess = async (
  loggedUser: User,
  loginProps: ScreenProps<ScreenNames.Login>,
) => {
  loginProps.login(loggedUser);
  await mountCoreScreen(loginProps);
};

export default completeLoginProcess;
