import StringKeys from '../../../types/search/filters/keys/StringKeys';
import NumberKeys from '../../../types/search/filters/keys/NumberKeys';
import BooleanKeys from '../../../types/search/filters/keys/BooleanKeys';
import {ObjectShape} from 'yup/lib/object';
import {number} from 'yup';

export const typeData = [
  'Apartment',
  'Single Family',
  'Vacant Land',
  'Condo',
  'Multiple Occupancy',
  'Residential',
  'Townhouse',
  'MultiFamily',
  'Mobile / Manufactured',
  'other',
];

export const decimalSchema = {
  numberChosen: number().min(100, 'Minimum should be 100.').nullable(),
};

export const numberSchema = {
  numberChosen: number().min(0, 'Minimum should be 0').integer().nullable(),
};

export const stringFilterData = new Map<keyof StringKeys, string[]>([
  ['type', typeData],
]);

export const numberFilterData = new Map<keyof NumberKeys, ObjectShape>([
  ['max_lot_size', decimalSchema],
  ['min_lot_size', decimalSchema],
  ['max_living_area', decimalSchema],
  ['max_bedrooms', numberSchema],
  ['min_bedrooms', numberSchema],
  ['max_bathrooms', numberSchema],
  ['min_bathrooms', numberSchema],
  ['max_stories', numberSchema],
  ['min_stories', numberSchema],
  ['age', numberSchema],
  ['distance_from_center', decimalSchema],
]);

const data: Array<keyof BooleanKeys | keyof NumberKeys | keyof StringKeys> = [
  'type',
  'age',
  'has_garage',
  'has_heating',
  'has_garage',
  'max_bedrooms',
  'min_bedrooms',
  'max_bathrooms',
  'min_bathrooms',
  'max_stories',
  'min_stories',
  'max_living_area',
  'min_living_area',
  'max_lot_size',
  'min_lot_size',
  'distance_from_center',
];

export const booleanFilterKeys: Array<keyof BooleanKeys> = [
  'has_garage',
  'has_heating',
  'has_cooling',
];

export const numberFilterKeys: Array<keyof NumberKeys> = [
  'age',
  'max_bedrooms',
  'min_bedrooms',
  'max_bathrooms',
  'min_bathrooms',
  'max_stories',
  'min_stories',
  'max_living_area',
  'min_living_area',
  'max_lot_size',
  'min_lot_size',
  'distance_from_center',
];

export const stringFilterKeys: Array<keyof StringKeys> = ['type'];
export default data;
