/* istanbul ignore file */
import {Platform} from 'react-native';

export default function getOS(): 'android' | 'ios' {
  if (Platform.OS == 'ios') {
    return Platform.OS;
  }
  return 'android';
}
