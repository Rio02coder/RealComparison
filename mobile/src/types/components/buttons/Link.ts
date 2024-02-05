import {StackNavigationProp} from '@react-navigation/stack';
import {NavigationStackTypes} from '../../NavigationStackTypes';
import {ScreenNames} from '../../ScreenNames';

export default interface LinkProps {
  testID?: string;
  title: string;
  navigation: StackNavigationProp<NavigationStackTypes, ScreenNames>;
  nextScreen: ScreenNames;
  marginTop: number;
  height?: number | string;
  width?: number | string;
}
