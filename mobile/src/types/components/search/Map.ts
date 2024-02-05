import {StackNavigationProp} from '@react-navigation/stack';
import {NavigationStackTypes} from '../../NavigationStackTypes';
import {ScreenNames} from '../../ScreenNames';

export default interface MapSearchProps {
  navigation: StackNavigationProp<NavigationStackTypes, ScreenNames>;
}
