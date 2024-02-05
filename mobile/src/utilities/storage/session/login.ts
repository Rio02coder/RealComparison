/* istanbul ignore file */
import {SessionTokens} from '../../../types/utilities/storage/Session';
import {MemoryIDs, setItem} from '../Memory';

/**
 * Just store the keys able to fetch all user's data. This way, when the app is opened again,
 * data will get fetched in its most updated state, avoiding outdated completely locally stored
 * user's information.
 * @param tokens The tokens used to remember the current session in another future app reload.
 */
const login = (tokens: SessionTokens) => setItem(MemoryIDs.SESSION, tokens);

export default login;
