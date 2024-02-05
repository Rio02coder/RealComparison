import {Property} from '../../types/Property';

export const LIMITING_NUMBER = 10;

const Limiter = (properties: Property[]) =>
  properties.slice(0, LIMITING_NUMBER);

export const manageSearchData = (
  properties: Property[],
  lastIndexed: number,
  currentData: Property[],
) => {
  const newProperties = properties.splice(lastIndexed, LIMITING_NUMBER);
  return {
    newData: newProperties,
    lastIndex: newProperties.length + currentData.length,
  };
};

export default Limiter;
