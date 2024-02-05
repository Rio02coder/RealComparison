import PickByType from '../../../PickByType';
import {PropertyFilter} from '../../../Property';

type StringKeys = PickByType<PropertyFilter, string>;

export default StringKeys;
