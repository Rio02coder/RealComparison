import React from 'react';
import PropertyNameProps from '../../types/components/property/PropertyName';
import Title from '../Title';

const getPropertyName = (address: string, city: string): string =>
  address + ', ' + city.charAt(0).toUpperCase() + city.slice(1);

const PropertyName = (props: PropertyNameProps) => {
  const propertyName = getPropertyName(props.address, props.city);
  return (
    <Title
      title={propertyName}
      size={props.size ? props.size : 25}
      top={props.top ? props.top : 0}
      flexDirection={props.flexDirection}
    />
  );
};

export default PropertyName;
