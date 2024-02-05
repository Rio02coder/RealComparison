import React, {useContext} from 'react';
import {TouchableOpacity, Text, Alert} from 'react-native';
import submitButtonStyles from '../../styles/defaults/buttons/Submit';
import DropOwnershipProps from '../../types/components/property/DropOwnership';
import {changePropertyStatusManager} from '../../service/Contactor/Property/changePropertyStatus';
import ConcreteProperty from '../../types/ConcreteProperty';
import ENDPOINTS from '../../service/endpoints';
import {PropertyScreenContext} from '../../screens/Property';
import {removeOwnedPropertyManager} from '../../utilities/property/OwnedPropertyManager';

const successAlert = () => {
  Alert.alert('Successfully Dropped Ownership');
};

const DropOwnerShip = (props: DropOwnershipProps) => {
  const {setProperty} = useContext(PropertyScreenContext);
  return (
    <TouchableOpacity
      style={[submitButtonStyles.container, {width: 180, height: 50}]}
      onPress={() => {
        successAlert();
        changePropertyStatusManager(
          new ConcreteProperty(props.property),
          ENDPOINTS.PROPERTY.DROP_OWNERSHIP,
          props.reduxProps,
        ).then(() => {
          removeOwnedPropertyManager(
            props.property,
            props.reduxProps,
            setProperty,
          );
        });
      }}>
      <Text
        style={[submitButtonStyles.text, {fontWeight: 'bold', fontSize: 17}]}>
        Drop Ownership
      </Text>
    </TouchableOpacity>
  );
};

export default DropOwnerShip;
