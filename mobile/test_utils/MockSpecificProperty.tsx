import {SpecificProperty} from '../src/types/Property';
import {convertToPasswordlessBackendUserFormat} from '../src/utilities/adapters/User';
import mockProperty from './MockProperty';
import mockUser from './MockUser';

const mockSpecificProperty: SpecificProperty = {
  ...mockProperty,
  for_sale: true,
  views: 54,
  favorites: 2,
  owner: convertToPasswordlessBackendUserFormat(mockUser)['user'],
  creator: null,
};

export default mockSpecificProperty;
