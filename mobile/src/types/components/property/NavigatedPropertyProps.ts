import {StackNavigationProp} from '@react-navigation/stack';
import {NavigationStackTypes} from '../../NavigationStackTypes';
import {Property} from '../../Property';
import {ScreenNames} from '../../ScreenNames';
import PropertyElementProps from './PropertyElement';
import ReduxProps from '../../redux/props';

export default interface NavigatedPropertyProps extends PropertyElementProps {
  reduxProps: ReduxProps;
  navigation: StackNavigationProp<NavigationStackTypes, ScreenNames>;
  nextScreen: ScreenNames;
  payload?: {property: Property};
}
