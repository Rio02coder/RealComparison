import {ScreenProps} from '../../../types/Screen';
import {ScreenNames} from '../../../types/ScreenNames';

const completeLogoutProcess = (loginProps: ScreenProps<ScreenNames.Login>) => {
  loginProps.clearPropertyState();
  loginProps.logout();
  loginProps.navigation.reset({
    index: 0,
    routes: [{name: ScreenNames.Login}],
  });
};

export default completeLogoutProcess;
