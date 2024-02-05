import {StackNavigationProp} from '@react-navigation/stack';
import {NavigationStackTypes} from '../../NavigationStackTypes';
import {Property} from '../../Property';
import {ScreenNames} from '../../ScreenNames';

export default interface PropertyListProps {
  navigation: StackNavigationProp<NavigationStackTypes, ScreenNames>;
}
