import {ScreenProps} from '../../../types/Screen';
import {ScreenNames} from '../../../types/ScreenNames';
import completeLogoutProcess from './completeLogoutProcess';
import attemptLoginSessionRestore from './attemptLoginSessionRestore';

const handleSession = (loginProps: ScreenProps<ScreenNames.Login>) =>
  loginProps.route.params?.logout
    ? completeLogoutProcess(loginProps)
    : attemptLoginSessionRestore(loginProps);

export default handleSession;
