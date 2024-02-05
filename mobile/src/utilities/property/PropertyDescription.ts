import {Property} from '../../types/Property';

export const PROPERTY_DESCRIPTION_PARAMS: Array<keyof Property> = [
  'has_cooling',
  'has_heating',
  'has_garage',
  'num_of_bathrooms',
  'num_of_bedrooms',
  'num_of_stories',
  'type',
];

const getDescription = (
  property: Property,
): [string, string | number | boolean][] => {
  const propertyArray = Object.entries(property);
  const propertyDescriptionArray = propertyArray.filter(([key, value]) => {
    return PROPERTY_DESCRIPTION_PARAMS.includes(key as keyof Property);
  });
  return propertyDescriptionArray;
};

export default getDescription;
