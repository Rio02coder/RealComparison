import {ActionCreator} from 'redux';
import filterPayLoad from '../../types/redux/payloads/FilterPayLoad';
import FilterAction, {FilterActions} from '../../types/redux/actions/Filter';

const updateFilter: ActionCreator<FilterAction> = (
  filterToUpdate: filterPayLoad,
) => ({
  type: FilterActions.UPDATE,
  payload: filterToUpdate,
});

const generateFilterActions = {
  updateFilter: updateFilter,
};

export default generateFilterActions;
