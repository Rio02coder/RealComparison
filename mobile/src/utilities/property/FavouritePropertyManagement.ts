import {backend} from '../../service/server';
import {FormPath} from '../../types/service/Requester';
import Requester from '../../service/Requester';
import {Property} from '../../types/Property';
import SessionChainErrorHandler from '../errors/backend/SessionChainErrorHandler';
import getUserUpdatingSlice from '../storage/ReduxTokenizer';
import ReduxProps from '../../types/redux/props';
import ENDPOINTS from '../../service/endpoints';

/**
 * @param property
 * @returns a JSON with just property ID
 */
const getPropertyJSONForFavourites = (property: Property) => {
  const propertyIDObject = {
    id: property.id,
  };

  return JSON.stringify(propertyIDObject);
};

const getPropertyRequester = (
  path: FormPath<Property>,
  property: Property,
): Requester<string> =>
  new Requester<string>(path, getPropertyJSONForFavourites(property));

const sessionUpdater = (
  property: Property,
  path: FormPath<Property>,
  props: ReduxProps,
) =>
  new SessionChainErrorHandler<string>(
    getUserUpdatingSlice(props),
    getPropertyRequester(path, property),
  ).recover();

export const addFavouriteProperty = (property: Property, props: ReduxProps) => {
  const path: FormPath<Property> = {
    api: backend(),
    config: {
      url: ENDPOINTS.PROPERTY.FAVORITE,
      method: 'POST',
    },
    responseHandler: response => response,
  };
  sessionUpdater(property, path, props);
};

export const removeFavouriteProperty = (
  property: Property,
  props: ReduxProps,
) => {
  const path: FormPath<Property> = {
    api: backend(),
    config: {
      url: ENDPOINTS.PROPERTY.UNFAVORITE,
      method: 'POST',
    },
    responseHandler: response => response,
  };
  sessionUpdater(property, path, props);
};
