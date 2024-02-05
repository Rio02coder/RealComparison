import ReduxProps from '../redux/props';
import {StackNavigationProp} from '@react-navigation/stack';
import {NavigationStackTypes} from '../NavigationStackTypes';
import {ScreenNames} from '../ScreenNames';

const fullyLogout = (
  reduxProps: ReduxProps,
  navigation: StackNavigationProp<NavigationStackTypes, ScreenNames>,
) => {
  reduxProps.logout();
  navigation.replace(ScreenNames.Login, {logout: true});
};

export default fullyLogout;
