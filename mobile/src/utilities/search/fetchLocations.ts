import ENDPOINTS from '../../service/endpoints';
import {Property} from '../../types/Property';
import SessionManager from '../errors/backend/SessionManager';
import limiter from '../../components/search/Limiter';
import {ScreenNames} from '../../types/ScreenNames';
import {ScreenProps} from '../../types/Screen';

const fetchLocations = (
  setAllProperties: React.Dispatch<React.SetStateAction<Property[]>>,
  core?: ScreenProps<ScreenNames.Core>,
) => {
  if (!core) {
    return;
  }
  new SessionManager<void, Property[], void, Property[]>(
    undefined,
    ENDPOINTS.PROPERTY.RETRIEVE,
    'GET',
    core,
    properties => setAllProperties(limiter(properties)),
  ).query();
};

export default fetchLocations;
