import {Reducer} from 'redux';
import {PropertyFilter} from '../../types/Property';
import FilterPayLoad from '../../types/redux/payloads/FilterPayLoad';
import FilterAction, {FilterActions} from '../../types/redux/actions/Filter';
import filterState from '../../types/redux/states/Filter';

export type ReducerType = Reducer<PropertyFilter, FilterAction<FilterPayLoad>>;

const reducer: ReducerType = (state = filterState, action) => {
  switch (action.type) {
    case FilterActions.UPDATE:
      return {...state, [action.payload.filterKey]: action.payload.value};
    default:
      return state;
  }
};

export default reducer;
