import StringKeys from './keys/StringKeys';
import NumberKeys from './keys/NumberKeys';
import BooleanKeys from './keys/BooleanKeys';
import ReduxProps from '../../redux/props';

type FilterCreatorProps = {
  booleanFilters: Array<keyof BooleanKeys>;
  stringFilters: Array<keyof StringKeys>;
  numberFilters: Array<keyof NumberKeys>;
  props: ReduxProps;
};

export default FilterCreatorProps;
