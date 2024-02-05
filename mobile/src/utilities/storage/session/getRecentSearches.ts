/* istanbul ignore file */
import {getItem, MemoryIDs} from '../Memory';

const getRecentSearches = () =>
  getItem<string[]>(MemoryIDs.SEARCH).then(response =>
    response ? response : [],
  );

export default getRecentSearches;
