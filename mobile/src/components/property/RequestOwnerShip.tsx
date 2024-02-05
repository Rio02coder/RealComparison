import React from 'react';
import {TouchableOpacity, Text} from 'react-native';
import submitButtonStyles from '../../styles/defaults/buttons/Submit';
import ConcreteProperty from '../../types/ConcreteProperty';
import {
  invalidRequestOfOwnershipAlert,
  validRequestOfOwnershipAlert,
} from './Alerts';
import {requestOwnerShipProps} from '../../types/components/property/RequestOwnership';
import {changePropertyStatusManager} from '../../service/Contactor/Property/changePropertyStatus';
import ENDPOINTS from '../../service/endpoints';

const RequestOwnerShip = (props: requestOwnerShipProps) => {
  return (
    <TouchableOpacity
      style={[submitButtonStyles.container, {width: 180, height: 50}]}
      onPress={() => {
        changePropertyStatusManager(
          new ConcreteProperty(props.property),
          ENDPOINTS.PROPERTY.REQUEST_OWNERSHIP,
          props.reduxProps,
        )
          .then(() => validRequestOfOwnershipAlert())
          .catch(() => invalidRequestOfOwnershipAlert());
      }}>
      <Text
        style={[submitButtonStyles.text, {fontWeight: 'bold', fontSize: 17}]}>
        Request Ownership
      </Text>
    </TouchableOpacity>
  );
};

export default RequestOwnerShip;
