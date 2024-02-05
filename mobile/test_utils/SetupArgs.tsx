import {Property} from '../src/types/Property';
import PropertiesState from '../src/types/redux/states/PropertiesState';
import {ScreenNames} from '../src/types/ScreenNames';
import User from '../src/types/User';

interface setupArgs {
  initialScreen?: ScreenNames;
  user?: User;
  properties?: PropertiesState;
  property?: Property;
  propertyListParams?: boolean;
}

export default setupArgs;
