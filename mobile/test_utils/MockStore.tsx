import mockProperties from './MockProperties';
import mockUser from './MockUser';
import configureStore from 'redux-mock-store';
import mockFilters from './MockFilters';

const defaultStore = configureStore([]);

let mockStore = defaultStore({
  user: mockUser,
  properties: mockProperties,
  search: 'test_search',
  filters: mockFilters,
});

export default mockStore;
