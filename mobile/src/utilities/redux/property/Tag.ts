/* istanbul ignore file */
import getFavorites from '../../../service/Contactor/Property/Favorites';
import ReduxProps from '../../../types/redux/props';
import {tags} from '../../../types/redux/Tags';
import PropertyTagUpdatorType from '../../../types/redux/tagUpdators/propertyTagUpdators';
import getCreated from '../../../service/Contactor/Property/Created';
import getOwned from '../../../service/Contactor/Property/Owned';

/**
 * This function maps a tag to a contactor and its remover
 */
const tagContactor = new Map<tags, PropertyTagUpdatorType>([
  [
    tags.FAVORITE,
    {updater: [getFavorites, (props: ReduxProps) => props.removeFavourite]},
  ],
  [
    tags.CREATED,
    {
      updater: [
        getCreated,
        (props: ReduxProps) => props.removeCreateProperties,
      ],
    },
  ],
  [
    tags.OWNED,
    {
      updater: [getOwned, (props: ReduxProps) => props.removeOwnedProperties],
    },
  ],
]);

export default tagContactor;
