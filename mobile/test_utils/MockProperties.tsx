import PropertiesState from '../src/types/redux/states/PropertiesState';
import {tags} from '../src/types/redux/Tags';
import getInitialState from '../src/utilities/redux/property/getInitialState';
import mockProperty from './MockProperty';

const mockProperties: PropertiesState = new Map([
  [tags.CREATED, []],
  [tags.FAVORITE, []],
  [tags.OWNED, []],
]);

export default mockProperties;
