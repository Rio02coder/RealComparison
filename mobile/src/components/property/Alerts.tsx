/* istanbul ignore file */
import {Alert} from 'react-native';

export const invalidRequestOfOwnershipAlert = () => {
  return Alert.alert('Something Went Wrong');
};

export const validRequestOfOwnershipAlert = () => {
  return Alert.alert(
    'Request Successful',
    'You should be getting a letter with the code inside it. Enter the code, to verify your ownership.',
  );
};
