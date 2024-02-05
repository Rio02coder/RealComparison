/* istanbul ignore file */
import User from '../../../types/User';
import getCurrentSession from './getCurrentSession';
import getSessionRestorer from '../../../service/Restorer';

const attemptSessionRestore = (): Promise<User> => {
  return new Promise<User>(async (resolve, reject) => {
    const sessionKeys = await getCurrentSession();
    if (!sessionKeys) {
      return reject('There is no previously stored session');
    }
    const restoredUser = await getSessionRestorer(sessionKeys).recover();
    restoredUser.token = sessionKeys;
    return resolve(restoredUser);
  });
};

export default attemptSessionRestore;
