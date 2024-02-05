import {getItem, MemoryIDs} from '../Memory';
import {SessionTokens} from '../../../types/utilities/storage/Session';

const getCurrentSession = () => getItem<SessionTokens>(MemoryIDs.SESSION);

export default getCurrentSession;
