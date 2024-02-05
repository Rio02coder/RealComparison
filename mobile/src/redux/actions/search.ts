import {ActionCreator} from 'redux';
import SearchAction, {SearchActions} from '../../types/redux/actions/search';
import {searchTags} from '../../types/redux/Tags';

const updateLocationSearch: ActionCreator<SearchAction> = (
  currentSearch: string,
) => ({
  type: SearchActions.UPDATE,
  payload: {
    tag: searchTags.LOCATION,
    search: currentSearch,
  },
});

const updateUserSearch: ActionCreator<SearchAction> = (
  currentSearch: string,
) => ({
  type: SearchActions.UPDATE,
  payload: {
    tag: searchTags.USER,
    search: currentSearch,
  },
});

const generateSearchAction = {
  updateLocation: updateLocationSearch,
  updateUser: updateUserSearch,
};

export default generateSearchAction;
