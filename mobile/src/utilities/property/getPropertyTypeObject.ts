import ModifiedDataPayload from '../../types/search/filters/ModifiedDataPayload';

export const getPropertyTypeObject = <inputType extends any>(
  labelToCheck: string,
  stringifiedObjects: ModifiedDataPayload<inputType>[],
): ModifiedDataPayload<inputType> | undefined => {
  return stringifiedObjects.find(({label}) => label === labelToCheck);
};
