import PickByType from '../../../PickByType';
import {PropertyFilter} from '../../../Property';

type NumberKeys = PickByType<PropertyFilter, number>;

export default NumberKeys;
