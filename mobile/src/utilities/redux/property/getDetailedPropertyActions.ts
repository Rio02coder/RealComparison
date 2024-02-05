import {PropertyActions} from '../../../types/redux/actions/property';
import PropertyActionTags from '../../../types/redux/actionTags/Properties';
import {PropertyUpdaterActions} from '../../../types/redux/payloads/PropertyUpdator';
import {tags} from '../../../types/redux/Tags';

const detailedPropertyActions = new Map<PropertyActions, PropertyActionTags>([
  [
    PropertyActions.FAVOURITE,
    {action: PropertyUpdaterActions.ADD, tags: [tags.FAVORITE]},
  ],
  [
    PropertyActions.REMOVE_FAVOURITE,
    {action: PropertyUpdaterActions.REMOVE, tags: [tags.FAVORITE]},
  ],
  [
    PropertyActions.CREATE_PROPERTY,
    {action: PropertyUpdaterActions.ADD, tags: [tags.CREATED]},
  ],
  [
    PropertyActions.REMOVE_CREATE_PROPERTY,
    {
      action: PropertyUpdaterActions.REMOVE,
      tags: [tags.CREATED, tags.FAVORITE],
    },
  ],
  [
    PropertyActions.OWN_PROPERTY,
    {
      action: PropertyUpdaterActions.ADD,
      tags: [tags.OWNED],
    },
  ],
  [
    PropertyActions.REMOVE_OWN_PROPERTY,
    {
      action: PropertyUpdaterActions.REMOVE,
      tags: [tags.OWNED],
    },
  ],
  [
    PropertyActions.UPDATE,
    {
      action: PropertyUpdaterActions.UPDATE,
      tags: [tags.OWNED, tags.FAVORITE, tags.CREATED],
    },
  ],
  [PropertyActions.CLEAR, {action: PropertyUpdaterActions.REMOVE_ALL}],
]);

export default detailedPropertyActions;
