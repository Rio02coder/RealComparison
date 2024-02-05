import React from 'react';
import MapView, {Marker} from 'react-native-maps';
import MapProps from '../../types/components/Map';
import StylesWithoutProps from '../../styles/components/Map';
import getPropertyMapIcon from '../../utilities/property/PropertyMapIcon';
import customMapStyle from './customStyle';

const Map = (props: MapProps) => {
  const styles = StylesWithoutProps(props);
  return (
    <MapView
      userInterfaceStyle={'dark'}
      customMapStyle={customMapStyle}
      testID="PropertyMap"
      style={[styles.map]}
      initialRegion={{
        latitude: Number(props.latitude),
        longitude: Number(props.longitude),
        latitudeDelta: props.latitudeDelta,
        longitudeDelta: props.longitudeDelta,
      }}>
      {props.data
        ? props.data.map(property => (
            <Marker
              coordinate={{
                latitude: Number(property.latitude),
                longitude: Number(property.longitude),
              }}
              onPress={() =>
                props.setPropertyToShow && props.setPropertyToShow(property)
              }
              key={`${property.latitude},${property.longitude}`}>
              {getPropertyMapIcon(property)}
            </Marker>
          ))
        : props.showMarker && (
            <Marker
              coordinate={{
                latitude: Number(props.latitude),
                longitude: Number(props.longitude),
              }}
            />
          )}
    </MapView>
  );
};

export default Map;
