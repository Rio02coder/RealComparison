/* istanbul ignore file */
import {Property} from '../../../types/Property';
import ReduxProps from '../../../types/redux/props';
import ENDPOINTS from '../../endpoints';
import Retriever from './Retriever';

const getCreated = (props: ReduxProps) => {
  const retriever = new Retriever<Property[]>(
    ENDPOINTS.PROPERTY.GET_CREATED_PROPERTIES,
    props,
    properties => properties,
    {
      update: reduxProps => properties =>
        reduxProps.createProperties(properties),
      adapt: properties => properties,
    },
  );
  return retriever.query();
};

export default getCreated;
