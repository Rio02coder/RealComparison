import React, {useContext} from 'react';
import Title from '../Title';
import Map from '../maps/Map';
import {CoordinateDeltas} from '../../types/CoordinateDeltas';
import {Property} from '../../types/Property';
import {PropertyScreenContext} from '../../screens/Property';
import {retrievePropertyFromState} from '../../utilities/property/retrieveProperty';
import ReduxProps from '../../types/redux/props';

const PropertyLocation: React.FC<{property: Property}> = ({property}) => {
  const {reduxProps} = useContext(PropertyScreenContext);
  const propertyToRetrieve = retrievePropertyFromState(
    property.id,
    reduxProps as ReduxProps,
  );
  const propertyToInspect = propertyToRetrieve ? propertyToRetrieve : property;
  return (
    <>
      <Title
        title="Location"
        flexDirection="row"
        top={10}
        size={23}
        left={10}
      />
      <Map
        latitude={propertyToInspect.latitude}
        longitude={propertyToInspect.longitude}
        latitudeDelta={CoordinateDeltas.LATITUDE_DELTA}
        longitudeDelta={CoordinateDeltas.LONGITUDE_DELTA}
        top={11}
        showMarker
        height={140}
      />
    </>
  );
};

export default PropertyLocation;
