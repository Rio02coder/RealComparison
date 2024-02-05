import ReduxProps from '../../types/redux/props';
import {Property} from '../../types/Property';

export const retrievePropertyFromState = (
  propertyID: number,
  reduxProps: ReduxProps,
): Property | undefined => {
  const getAllProperties = Array.from(reduxProps.properties.values()).flat(1);
  return getAllProperties.find(property => property.id === propertyID);
};
