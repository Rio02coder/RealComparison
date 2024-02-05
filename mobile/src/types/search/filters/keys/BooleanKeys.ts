import {PropertyFilter} from '../../../Property';
import PickByType from '../../../PickByType';

type BooleanKeys = PickByType<PropertyFilter, boolean>;

export default BooleanKeys;
