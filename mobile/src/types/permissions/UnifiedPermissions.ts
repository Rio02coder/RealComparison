import {AndroidPermission, IOSPermission} from 'react-native-permissions';

export default interface UnifiedPermission {
  ios: IOSPermission[]
  android: AndroidPermission[]
}