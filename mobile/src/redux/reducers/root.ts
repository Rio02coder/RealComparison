import {combineReducers, Reducer} from 'redux';
import userReducer from './user';
import {filterActions} from 'redux-ignore';
import UserAction, {UserActions} from '../../types/redux/actions/user';
import User from '../../types/User';
import PropertyAction, {
  PropertyActions,
} from '../../types/redux/actions/property';
import propertiesReducer from './properties';
import searchReducer from './search';
import filtersReducer from './filter';
import SearchAction, {SearchActions} from '../../types/redux/actions/search';
import PropertyState from '../../types/redux/states/PropertiesState';
import FilterAction, {FilterActions} from '../../types/redux/actions/Filter';
import {PropertyFilter} from '../../types/Property';
import SearchState from '../../types/redux/states/SearchState';

const reducer = combineReducers({
  user: filterActions(userReducer as Reducer<User>, action =>
    Object.values(UserActions).includes(action.type),
  ) as Reducer<User, UserAction>,
  properties: filterActions(
    propertiesReducer as Reducer<PropertyState>,
    action => Object.values(PropertyActions).includes(action.type),
  ) as Reducer<PropertyState, PropertyAction>,
  search: filterActions(searchReducer as Reducer<SearchState>, action =>
    Object.values(SearchActions).includes(action.type),
  ) as Reducer<SearchState, SearchAction>,
  filters: filterActions(filtersReducer as Reducer<PropertyFilter>, action =>
    Object.values(FilterActions).includes(action.type),
  ) as Reducer<PropertyFilter, FilterAction>,
});

export default reducer;
