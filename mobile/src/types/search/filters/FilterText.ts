import BooleanKeys from '../../../types/search/filters/keys/BooleanKeys';
import NumberKeys from './keys/NumberKeys';
import StringKeys from './keys/StringKeys';

function getStringifiedKey<T>(key: keyof T) {
  return key as string;
}

function capitaliseString(stringToCapitalise: string) {
  return stringToCapitalise[0].toUpperCase() + stringToCapitalise.substring(1);
}

export const booleanFilterText = (filters: BooleanKeys) => {
  const stringifiedFilter = getStringifiedKey<BooleanKeys>(
    filters as keyof BooleanKeys,
  );
  const strippedFilter = stringifiedFilter.substring(4);
  return capitaliseString(strippedFilter);
};

export const numberFilterText = (filters: NumberKeys) => {
  const stringifiedFilter = getStringifiedKey<NumberKeys>(
    filters as keyof NumberKeys,
  );
  const strippedFilter = stringifiedFilter.split('_').join(' ');
  return capitaliseString(strippedFilter);
};

export const stringFilterText = (filters: StringKeys) => {
  const stringifiedFilter = getStringifiedKey<StringKeys>(
    filters as keyof StringKeys,
  );
  return capitaliseString(stringifiedFilter);
};
