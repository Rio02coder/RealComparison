import {PERMISSIONS} from 'react-native-permissions';
import UnifiedPermission from './UnifiedPermissions';

export default class Permissions {
  public static readonly LOCATION: UnifiedPermission = {
    ios: [
      PERMISSIONS.IOS.LOCATION_ALWAYS,
      PERMISSIONS.IOS.LOCATION_WHEN_IN_USE,
    ],
    android: [
      PERMISSIONS.ANDROID.ACCESS_BACKGROUND_LOCATION,
      PERMISSIONS.ANDROID.ACCESS_COARSE_LOCATION,
      PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
    ]
  };
}