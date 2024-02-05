import {Property} from '../Property';

export default interface MapProps {
  latitude: number;
  longitude: number;
  latitudeDelta: number;
  longitudeDelta: number;
  top: number;
  height: number;
  showMarker?: boolean;
  setPropertyToShow?: (property: Property | null) => void;
  data?: Property[];
}
