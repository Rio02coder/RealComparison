import {connect} from 'react-redux';
import {Property} from '../types/Property';
import RootState from '../types/redux/states/root';
import RequireAtLeastOne from '../types/RequireAtLeastOne';
import User from '../types/User';
import generatePropertiesAction from './actions/properties';
import generateSearchAction from './actions/search';
import generateUserActions from './actions/user';
import store from './store';
import filterPayLoad from '../types/redux/payloads/FilterPayLoad';
import generateFilterActions from './actions/filter';

const mapState = (state: RootState) => ({
  user: state.user,
  properties: state.properties,
  search: state.search,
  filters: state.filters,
});

const mapDispatch = {
  update: (user: RequireAtLeastOne<User>) =>
    generateUserActions.update({...store.getState().user, ...user}),
  login: (user: User) => generateUserActions.login(user),
  logout: () => generateUserActions.logout(),
  favourite: (properties: Property[]) =>
    generatePropertiesAction.favourite(properties),
  removeFavourite: (properties: Property[]) =>
    generatePropertiesAction.removeFavourite(properties),
  createProperties: (properties: Property[]) =>
    generatePropertiesAction.createProperties(properties),
  removeCreateProperties: (properties: Property[]) =>
    generatePropertiesAction.removeCreatedProperties(properties),
  addOwnedProperties: (properties: Property[]) =>
    generatePropertiesAction.ownProperties(properties),
  removeOwnedProperties: (properties: Property[]) =>
    generatePropertiesAction.removeOwnProperties(properties),
  clearPropertyState: () => generatePropertiesAction.clearPropertyState(),
  updateProperties: (properties: Property[]) =>
    generatePropertiesAction.updateProperties(properties),
  updateLocation: (currentSearch: string) =>
    generateSearchAction.updateLocation(currentSearch),
  updateUserSearch: (currentSearch: string) =>
    generateSearchAction.updateUser(currentSearch),
  updateFilter: (filterToUpdate: filterPayLoad) =>
    generateFilterActions.updateFilter(filterToUpdate),
};
const connector = connect(mapState, mapDispatch);

export default connector;
