import React from 'react';
import {View} from 'react-native';
import ImageSlider from '../forms/standalone/imagePicker/ImageSlider';
import PropertyName from './PropertyName';
import PropertyProfileProps from '../../types/components/property/Profile';
import PropertySection from './Section';
import {getAllPropertyImages} from '../../utilities/property/PropertyImages';

const PropertyProfile: React.FC<PropertyProfileProps> = props => {
  const property = props.route.params.property;
  return (
    <PropertySection>
      <ImageSlider
        isInspectedByOwner={props.isUserOwnerOfThisProperty}
        propertyId={property.id}
        previews={getAllPropertyImages(props, property)}
        reduxProps={{...props}}
      />
      <PropertyName
        city={property.city}
        address={property.street_address}
        flexDirection="row"
      />
    </PropertySection>
  );
};

export default PropertyProfile;
