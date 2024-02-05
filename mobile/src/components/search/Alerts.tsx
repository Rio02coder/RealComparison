import {Alert} from 'react-native';

const noDataAlert = () => {
  return Alert.alert('Sorry :(', 'No properties matched your search.');
};

export const successfulTransferUserAlert = (userEmail: string) => {
  return Alert.alert(
    'Ownership Transferred',
    `Ownership of this property has been transferred to ${userEmail}`,
  );
};

export default noDataAlert;
