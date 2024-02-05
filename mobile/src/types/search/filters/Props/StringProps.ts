import StringKeys from '../keys/StringKeys';
import Filter from './Filter';

type StringProps = Filter & {
  filterKey: StringKeys;
  range: string[];
};

export default StringProps;
