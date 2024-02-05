import React, {useContext} from 'react';
import SellPropertyProps from '../../types/components/property/SellProperty';
import {Alert, TouchableOpacity, View} from 'react-native';
import MarkForSaleIcon from 'react-native-vector-icons/FontAwesome';
import UnmarkFromSaleIcon from 'react-native-vector-icons/FontAwesome5';
import {changePropertyStatusManager} from '../../service/Contactor/Property/changePropertyStatus';
import {Property, SpecificProperty} from '../../types/Property';
import ConcreteProperty from '../../types/ConcreteProperty';
import ENDPOINTS from '../../service/endpoints';
import ReduxProps from '../../types/redux/props';
import {setUpdatedProperty} from '../../utilities/property/OwnedPropertyManager';
import {PropertyScreenContext} from '../../screens/Property';
import SellIconStyle from '../../styles/components/property/headerIcons/Sell';
import {retrievePropertyFromState} from '../../utilities/property/retrieveProperty';

const manageSuccess = (
  onSale: boolean,
  propertyID: number,
  reduxProps: ReduxProps,
  setProperty: (property: Property) => void,
) => {
  setUpdatedProperty(reduxProps, propertyID, setProperty);
  onSale
    ? Alert.alert('Property is now marked for sale')
    : Alert.alert('Property is now un marked from sale');
};

const manageFailure = () => {
  Alert.alert('Something went wrong');
};

const SellIcon = (
  isForSale: boolean,
  property: SpecificProperty,
  reduxProps: ReduxProps,
) => {
  const {setProperty} = useContext(PropertyScreenContext);
  return isForSale ? (
    <TouchableOpacity
      onPress={() => {
        changePropertyStatusManager(
          new ConcreteProperty(property),
          ENDPOINTS.PROPERTY.UNMARK_FROM_SALE,
          reduxProps,
        )
          .then(() => {
            manageSuccess(false, property.id, reduxProps, setProperty);
          })
          .catch(() => manageFailure());
      }}>
      <UnmarkFromSaleIcon
        testID="for_sale_icon"
        name={'money-bill'}
        size={32}
        style={SellIconStyle.Icon}
      />
    </TouchableOpacity>
  ) : (
    <TouchableOpacity
      onPress={() => {
        changePropertyStatusManager(
          new ConcreteProperty(property),
          ENDPOINTS.PROPERTY.MARK_FOR_SALE,
          reduxProps,
        )
          .then(() => {
            manageSuccess(true, property.id, reduxProps, setProperty);
          })
          .catch(() => manageFailure());
      }}>
      <MarkForSaleIcon
        testID="not_for_sale_icon"
        name={'money'}
        size={34}
        style={SellIconStyle.Icon}
      />
    </TouchableOpacity>
  );
};

const SellProperty = (props: SellPropertyProps) => {
  const {isPropertyOwned} = useContext(PropertyScreenContext);
  return (
    <View>
      {isPropertyOwned
        ? SellIcon(props.property.for_sale, props.property, props.reduxProps)
        : null}
    </View>
  );
};

export default SellProperty;
