import FilterPayLoad from '../payloads/FilterPayLoad';
import GeneralAction from './general';

export enum FilterActions {
  UPDATE = 'Filter_Update',
}

export default interface FilterAction<T = FilterPayLoad> extends GeneralAction {
  type: FilterActions;
  payload: T;
}
