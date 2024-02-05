import {Property} from '../../Property';
import GeneralAction from './general';

export enum PropertyActions {
  FAVOURITE = 'MARK_AS_FAVOURITE',
  REMOVE_FAVOURITE = 'REMOVE_FROM_FAVOURITE',
  CREATE_PROPERTY = 'ADD_CREATED_PROPERTY',
  REMOVE_CREATE_PROPERTY = 'REMOVE_CREATE_PROPERTY',
  OWN_PROPERTY = 'ADD_OWN_PROPERTY',
  REMOVE_OWN_PROPERTY = 'REMOVE_OWN_PROPERTY',
  CLEAR = 'CLEAR',
  UPDATE = 'update',
}

export default interface PropertyAction<T = Property[]> extends GeneralAction {
  type: PropertyActions;
  payload: T;
}
