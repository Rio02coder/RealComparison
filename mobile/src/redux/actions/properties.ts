import {ActionCreator} from 'redux';
import {Property} from '../../types/Property';
import PropertyAction, {
  PropertyActions,
} from '../../types/redux/actions/property';

const favouriteAction: ActionCreator<PropertyAction> = (
  properties: Property[],
) => ({
  type: PropertyActions.FAVOURITE,
  payload: properties,
});

const removeFavouriteAction: ActionCreator<PropertyAction> = (
  properties: Property[],
) => ({
  type: PropertyActions.REMOVE_FAVOURITE,
  payload: properties,
});

const addCreatedPropertiesAction: ActionCreator<PropertyAction> = (
  properties: Property[],
) => ({
  type: PropertyActions.CREATE_PROPERTY,
  payload: properties,
});

const removeCreatedPropertiesAction: ActionCreator<PropertyAction> = (
  properties: Property[],
) => ({
  type: PropertyActions.REMOVE_CREATE_PROPERTY,
  payload: properties,
});

const addOwnPropertiesAction: ActionCreator<PropertyAction> = (
  properties: Property[],
) => ({
  type: PropertyActions.OWN_PROPERTY,
  payload: properties,
});

const removeOwnPropertiesAction: ActionCreator<PropertyAction> = (
  properties: Property[],
) => ({
  type: PropertyActions.REMOVE_OWN_PROPERTY,
  payload: properties,
});

const clearPropertyState: ActionCreator<PropertyAction> = () => ({
  type: PropertyActions.CLEAR,
  payload: [],
});

const updateProperties: ActionCreator<PropertyAction> = (
  properties: Property[],
) => ({
  type: PropertyActions.UPDATE,
  payload: properties,
});

const generatePropertiesAction = {
  favourite: favouriteAction,
  removeFavourite: removeFavouriteAction,
  clearPropertyState: clearPropertyState,
  createProperties: addCreatedPropertiesAction,
  removeCreatedProperties: removeCreatedPropertiesAction,
  ownProperties: addOwnPropertiesAction,
  removeOwnProperties: removeOwnPropertiesAction,
  updateProperties: updateProperties,
};

export default generatePropertiesAction;
