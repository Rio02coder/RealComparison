/* istanbul ignore file */
import {MemoryIDs, setItem} from '../Memory';

const saveSearch = (search: string[]) => setItem(MemoryIDs.SEARCH, search);

export default saveSearch;
