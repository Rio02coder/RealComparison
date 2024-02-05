import {Reducer} from 'redux';
import SearchAction, {SearchActions} from '../../types/redux/actions/search';
import SearchState from '../../types/redux/states/SearchState';
import getInitialState from '../../utilities/redux/Search/getInitialState';

export type ReducerType = Reducer<SearchState, SearchAction>;

const reducer: ReducerType = (state = getInitialState(), action) => {
  switch (action.type) {
    case SearchActions.UPDATE:
      return new Map(state.set(action.payload.tag, action.payload.search));
    default:
      return state;
  }
};

export default reducer;
