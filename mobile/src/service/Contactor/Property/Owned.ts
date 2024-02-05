/* istanbul ignore file */
import ReduxProps from '../../../types/redux/props';
import Retriever from './Retriever';
import {Property} from '../../../types/Property';
import ENDPOINTS from '../../endpoints';

const getOwned = (props: ReduxProps) => {
  const retriever = new Retriever<Property[]>(
    ENDPOINTS.PROPERTY.GET_OWNED_PROPERTIES,
    props,
    properties => properties,
    {
      update: reduxProps => properties =>
        reduxProps.addOwnedProperties(properties),
      adapt: properties => properties,
    },
  );
  return retriever.query();
};

export default getOwned;
