/* istanbul ignore file */
import {ScreenProps} from '../../../types/Screen';
import {ScreenNames} from '../../../types/ScreenNames';
import embedRelevantProperties from './embedRelevantProperties';

const mountCoreScreen = async (loginProps: ScreenProps<ScreenNames.Login>) => {
  await embedRelevantProperties(loginProps);
  loginProps.navigation.replace(ScreenNames.Core);
};

export default mountCoreScreen;
