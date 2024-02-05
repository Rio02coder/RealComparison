import ReduxProps from '../redux/props';
import {StackNavigationProp} from '@react-navigation/stack';
import {NavigationStackTypes} from '../NavigationStackTypes';
import {ScreenNames} from '../ScreenNames';

type ProfileExitProps = {
  reduxProps: ReduxProps;
  navigation: StackNavigationProp<NavigationStackTypes, ScreenNames>;
};

export default ProfileExitProps;
