import {StackNavigationProp} from '@react-navigation/stack';
import {NavigationStackTypes} from '../../NavigationStackTypes';
import {ScreenNames} from '../../ScreenNames';

export type ScreenPayloadFeeder = <nextScreen extends ScreenNames>(
  nextScreen: nextScreen,
) => NavigationStackTypes[nextScreen];

export default interface NavigationDrawerProps {
  navigation: StackNavigationProp<NavigationStackTypes, ScreenNames>;
  feeder?: ScreenPayloadFeeder;
}
