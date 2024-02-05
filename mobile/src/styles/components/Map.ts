import {StyleSheet} from 'react-native';
import MapProps from '../../types/components/Map';
import {WIDTH} from '../../types/Screen';

const MapStyle = (props: MapProps) =>
  StyleSheet.create({
    map: {
      height: props.height,
      width: WIDTH,
      marginTop: props.top,
      borderRadius: 5,
      flex: 1,
    },
  });

export default MapStyle;
