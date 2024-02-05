import {ScreenPayloadFeeder} from '../../types/components/AppNavigation/NavigationDrawer';
import {NavigationStackTypes} from '../../types/NavigationStackTypes';
import {ScreenNames} from '../../types/ScreenNames';

const defaultFeeder: ScreenPayloadFeeder = function <
  nextScreen extends ScreenNames,
>(nextScreen: nextScreen): NavigationStackTypes[nextScreen] {
  switch (nextScreen) {
    default:
      return undefined as NavigationStackTypes[nextScreen];
  }
};
export default defaultFeeder;
