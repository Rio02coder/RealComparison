/* istanbul ignore file */
import {Property} from '../../../types/Property';
import ReduxProps from '../../../types/redux/props';
import ENDPOINTS from '../../endpoints';
import Retriever from './Retriever';

const getFavorites = (props: ReduxProps) => {
  const retriever = new Retriever<{favorites: Property[]}>(
    ENDPOINTS.PROPERTY.GET_FAVORITES,
    props,
    properties => properties.favorites,
    {
      update: reduxProps => properties => reduxProps.favourite(properties),
      adapt: properties => properties.favorites,
    },
  );
  return retriever.query();
};

export default getFavorites;
