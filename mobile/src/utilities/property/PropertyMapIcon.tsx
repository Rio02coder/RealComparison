/* istanbul ignore file */
import {Property} from '../../types/Property';
import {Image} from 'react-native';
import React from 'react';

const getPropertyMapIcon = (property: Property) => {
  return property.is_verified ? (
    <Image
      source={require('../../assets/VerifiedProperty.png')}
      style={{height: 80, width: 80}}
    />
  ) : (
    <Image
      source={require('../../assets/UnverifiedProperty.png')}
      style={{height: 50, width: 50}}
    />
  );
};

export default getPropertyMapIcon;
