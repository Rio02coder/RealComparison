import ReduxProps from '../../types/redux/props';
import {Property} from '../../types/Property';
import {retrievePropertyFromState} from './retrieveProperty';

/**
 * This method looks for a property from redux
 * and returns the images from that property
 * @param reduxProps
 * @param property
 */
export const getAllPropertyImages = (
  reduxProps: ReduxProps,
  property: Property,
): string[] => {
  const propertyFromState = retrievePropertyFromState(property.id, reduxProps);
  return propertyFromState ? propertyFromState.image_urls : property.image_urls;
};
