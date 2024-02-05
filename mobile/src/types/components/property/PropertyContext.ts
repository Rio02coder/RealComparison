import {Property} from '../../Property';
import ReduxProps from '../../redux/props';
import {StackNavigationProp} from '@react-navigation/stack';
import {NavigationStackTypes} from '../../NavigationStackTypes';
import {ScreenNames} from '../../ScreenNames';

type PropertyContext = {
  setProperty: (property: Property) => void;
  reduxProps?: ReduxProps;
  isPropertyOwned: boolean;
  isWaiting: boolean;
  navigation?: StackNavigationProp<NavigationStackTypes, ScreenNames>;
};

export default PropertyContext;
