import GeneralAction from './general';
import SearchPayload from '../payloads/Search';

export enum SearchActions {
  UPDATE = 'UPDATE_SEARCH_SCREEN_BAR',
}

export default interface SearchAction<T = SearchPayload> extends GeneralAction {
  type: SearchActions;
  payload: T;
}
