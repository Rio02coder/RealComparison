import React from 'react';
import {ImageSourcePropType, View} from 'react-native';
import propertyElementStyles from '../../styles/components/property/PropertyElement';
import PropertyElementProps from '../../types/components/property/PropertyElement';
import ImageComponent from '../images/Image';
import Title from '../Title';
import {getAllPropertyImages} from '../../utilities/property/PropertyImages';
import ReduxProps from '../../types/redux/props';
import {Property} from '../../types/Property';

const getPropertyImageToShow = (
  reduxProps: ReduxProps,
  property: Property,
): ImageSourcePropType => {
  const allImages = getAllPropertyImages(reduxProps, property);
  return allImages.length > 0
    ? {uri: allImages[0]}
    : require('../../assets/no_image.png');
};

const PropertyElement = (props: PropertyElementProps) => {
  const containerStyles = propertyElementStyles(props);

  const propertyName = props.property.city;

  return (
    <View testID="property_preview" style={containerStyles.container}>
      <View>
        <ImageComponent
          source={getPropertyImageToShow(props.reduxProps, props.property)}
          heigth={props.imageHeight}
          width={props.imageWidth}
          opacity={0.75}
        />
      </View>
      <Title
        title={`${props.property.street_address}, ${
          propertyName[0].toUpperCase() + propertyName.substring(1)
        }`}
        size={22}
        absolute
      />
    </View>
  );
};

export default PropertyElement;
