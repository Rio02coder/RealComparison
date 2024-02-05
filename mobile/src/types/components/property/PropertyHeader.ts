import {ScreenNames} from '../../ScreenNames';
import {SpecificProperty} from '../../Property';
import ReduxProps from '../../redux/props';
import {StackNavigationProp} from '@react-navigation/stack';
import {NavigationStackTypes} from '../../NavigationStackTypes';

export default interface PropertyHeaderProps {
  property: SpecificProperty;
  reduxProps: ReduxProps;
  navigation: StackNavigationProp<NavigationStackTypes, ScreenNames>;
}
