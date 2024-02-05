import ENDPOINTS from '../../service/endpoints';
import {Property, PropertyFilter} from '../../types/Property';
import {ScreenProps} from '../../types/Screen';
import {ScreenNames} from '../../types/ScreenNames';
import SessionManager from '../errors/backend/SessionManager';

const search = (
  input: string | undefined,
  manageSearchOnFiltering: (properties: Property[]) => void,
  onEmptySearch: () => void,
  core?: ScreenProps<ScreenNames.Core>,
) => {
  if (!core) {
    return;
  }
  if (!input) {
    onEmptySearch();
    return;
  }
  new SessionManager<PropertyFilter, Property[]>(
    {...core.filters, q: input.replace(',', '')},
    ENDPOINTS.PROPERTY.SEARCH,
    'GET',
    core,
    properties => manageSearchOnFiltering(properties),
  ).query();
};

export default search;
