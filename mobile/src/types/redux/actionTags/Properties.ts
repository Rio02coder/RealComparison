import {PropertyUpdaterActions} from '../payloads/PropertyUpdator';
import {tags} from '../Tags';

export default interface PropertyActionTags {
  action: PropertyUpdaterActions;
  tags?: tags[];
}
