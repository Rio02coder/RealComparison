import {ScreenNames} from '../../ScreenNames';
import {ProfileScreenData} from '../Profile/ProfileScreenData';
import User from '../../User';
import OAuthenticator from '../../../utilities/authentication/OAuthenticator';

export const ProfileScreens: [
  ProfileScreenData,
  ScreenNames,
  (currentlyLoggedUser: User) => boolean,
][] = [
  [
    {name: 'user', iconName: 'user', iconSize: 30},
    ScreenNames.EditProfile,
    () => true,
  ],
  [
    {name: 'Change Password', iconName: 'lock', iconSize: 30},
    ScreenNames.ChangePassword,
    loggedUser => loggedUser && loggedUser.service === OAuthenticator,
  ],
];
