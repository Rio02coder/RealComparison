import {Reducer} from 'redux';
import {Property} from '../../types/Property';
import PropertyAction from '../../types/redux/actions/property';
import propertyPayloadUpdater from '../../utilities/redux/property/PropertyUpdater';
import PropertyState from '../../types/redux/states/PropertiesState';
import getInitialState from '../../utilities/redux/property/getInitialState';
import detailedPropertyActions from '../../utilities/redux/property/getDetailedPropertyActions';

const InitialState = getInitialState();

export type ReducerType = Reducer<PropertyState, PropertyAction<Property[]>>;

const reducer: ReducerType = (state = InitialState, action) => {
  const propertyActionTag = detailedPropertyActions.get(action.type);
  if (!propertyActionTag) {
    return state;
  }
  return new Map(
    propertyPayloadUpdater(
      state,
      action.payload,
      propertyActionTag.action,
      propertyActionTag.tags,
    ),
  );
};

export default reducer;
