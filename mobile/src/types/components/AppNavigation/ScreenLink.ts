import {StackNavigationProp} from '@react-navigation/stack';
import {StyleProp, ViewStyle} from 'react-native';
import {NavigationStackTypes} from '../../NavigationStackTypes';
import {ScreenNames} from '../../ScreenNames';
import IconData from './IconData';

export const navigationData: [IconData, ScreenNames][] = [
  [{IconName: 'heart-circle-outline', IconSize: 48}, ScreenNames.PropertyList],
  [{IconName: 'person-circle-outline', IconSize: 48}, ScreenNames.Profile],
  [
    {IconName: 'home', IconSize: 40, style: {marginLeft: 5}},
    ScreenNames.PropertyAdder,
  ],
  [
    {IconName: 'ios-compass-outline', IconSize: 46, style: {marginLeft: 5}},
    ScreenNames.RecommendationsList,
  ],
];

export default interface ScreenLinkProps<nextScreen extends ScreenNames> {
  icon: string;
  nextScreen: nextScreen;
  payload: NavigationStackTypes[nextScreen];
  navigation: StackNavigationProp<NavigationStackTypes, ScreenNames>;
  iconSize: number;
  style?: StyleProp<ViewStyle>;
}
