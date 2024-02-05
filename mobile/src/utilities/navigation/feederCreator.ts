import {ScreenPayloadFeeder} from '../../types/components/AppNavigation/NavigationDrawer';
import {NavigationStackTypes} from '../../types/NavigationStackTypes';
import RequireExactlyOne from '../../types/RequireExactlyOne';
import {ScreenNames} from '../../types/ScreenNames';
import defaultFeeder from './defaultFeeder';

function getFeeder<nextScreen extends ScreenNames>(
  nextScreen: nextScreen,
  payload: NavigationStackTypes[nextScreen],
  baseFeeder: ScreenPayloadFeeder = defaultFeeder,
): ScreenPayloadFeeder {
  return <followingScreen extends ScreenNames>(
    followingScreen: followingScreen,
  ) => {
    if (nextScreen.toString() == followingScreen.toString())
      return payload as unknown as NavigationStackTypes[followingScreen];
    return baseFeeder(followingScreen);
  };
}

export default getFeeder;
