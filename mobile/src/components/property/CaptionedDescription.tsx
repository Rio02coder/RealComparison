import PropertyDescriptionProps from '../../types/components/property/PropertyDescription';
import Title from '../Title';
import Description from './Description';
import React, {useContext, useEffect} from 'react';
import PropertySection from './Section';
import {PropertyScreenContext} from '../../screens/Property';
import {retrievePropertyFromState} from '../../utilities/property/retrieveProperty';
import ReduxProps from '../../types/redux/props';

const CaptionedDescription: React.FC<PropertyDescriptionProps> = ({
  property,
  isUserOwnerOfThisProperty,
}) => {
  const {reduxProps} = useContext(PropertyScreenContext);
  const propertyToRetrieve = retrievePropertyFromState(
    property.id,
    reduxProps as ReduxProps,
  );
  const propertyToInspect = propertyToRetrieve ? propertyToRetrieve : property;
  return (
    <PropertySection>
      <Title
        testID="description"
        title="Description"
        flexDirection="row"
        top={10}
        size={23}
      />
      <Description
        property={propertyToInspect}
        isUserOwnerOfThisProperty={isUserOwnerOfThisProperty}
      />
    </PropertySection>
  );
};

export default CaptionedDescription;
