import {ScreenProps} from '../../../types/Screen';
import {ScreenNames} from '../../../types/ScreenNames';
import restoreSession from './attemptSessionRestore';
import completeLoginProcess from './completeLoginProcess';

const attemptLoginSessionRestore = async (
  loginProps: ScreenProps<ScreenNames.Login>,
): Promise<void> => {
  try {
    const loggedUser = await restoreSession();
    completeLoginProcess(loggedUser, loginProps);
  } catch (err) {
    // no user is logged in, just ignore it...
  }
};

export default attemptLoginSessionRestore;
