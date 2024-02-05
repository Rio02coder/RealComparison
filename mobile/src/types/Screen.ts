import {Dimensions} from 'react-native';
import {StackNavigationProp} from '@react-navigation/stack';
import {RouteProp} from '@react-navigation/native';
import {NavigationStackTypes} from './NavigationStackTypes';
import {ScreenNames} from './ScreenNames';
import {
  widthPercentageToDP,
  heightPercentageToDP,
} from 'react-native-responsive-screen';
import ReduxProps from './redux/props';

export const WIDTH = Dimensions.get('window').width;
export const HEIGHT = Dimensions.get('window').height;
export const wp = widthPercentageToDP;
export const hp = heightPercentageToDP;

export const HEADER_SCROLL_DISTANCE = 38;
export const SCROLL_THRESHOLD = 23.4;

export interface ScreenProps<ScreenName extends ScreenNames>
  extends ReduxProps {
  navigation: StackNavigationProp<NavigationStackTypes, ScreenName>;
  route: RouteProp<NavigationStackTypes, ScreenName>;
}
