import React, {useContext} from 'react';
import {Platform, TouchableOpacity, View} from 'react-native';
import Icon from 'react-native-vector-icons/EvilIcons';
import BackIconStyles from '../../styles/components/property/headerIcons/BackIcon';
import PropertyHeaderProps from '../../types/components/property/PropertyHeader';
import connector from '../../redux/connector';
import ConcreteProperty from '../../types/ConcreteProperty';
import {PropertyScreenContext} from '../../screens/Property';
import SellProperty from './SellProperty';
import FavoriteIcon from './FavoriteIcon';

const PropertyHeader = (props: PropertyHeaderProps) => {
  const {setProperty} = useContext(PropertyScreenContext);
  const propertyPayload = new ConcreteProperty(props.property);
  return (
    <View
      style={[
        {
          flexDirection: 'row',
          height: Platform.OS === 'ios' ? 90 : 85,
          justifyContent: 'space-between',
        },
      ]}>
      <TouchableOpacity onPress={() => props.navigation.goBack()}>
        <Icon name="chevron-left" style={BackIconStyles.Icon} size={60} />
      </TouchableOpacity>
      <View style={{flexDirection: 'row'}}>
        {propertyPayload.is_verified ? (
          <SellProperty
            property={props.property}
            reduxProps={props.reduxProps}
          />
        ) : null}
        {propertyPayload.is_verified ? (
          <FavoriteIcon
            propertyPayload={propertyPayload}
            reduxProps={props.reduxProps}
            setProperty={setProperty}
          />
        ) : null}
      </View>
    </View>
  );
};

export default connector(PropertyHeader);
