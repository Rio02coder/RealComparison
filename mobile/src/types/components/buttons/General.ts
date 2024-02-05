import {StackNavigationProp} from '@react-navigation/stack';
import {StyleProp, ViewStyle} from 'react-native';
import {NavigationStackTypes} from '../../NavigationStackTypes';
import {ScreenNames} from '../../ScreenNames';

export default interface GeneralLinkProps<nextScreen extends ScreenNames> {
  navigation: StackNavigationProp<NavigationStackTypes, ScreenNames>;
  children: JSX.Element;
  nextScreen: nextScreen;
  payload: NavigationStackTypes[nextScreen];
  style?: StyleProp<ViewStyle>;
}
