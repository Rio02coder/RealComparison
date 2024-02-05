/* istanbul ignore file */
import ReduxProps from '../../../types/redux/props';
import {Property} from '../../../types/Property';
import Retriever from './Retriever';
import ENDPOINTS from '../../endpoints';

const getRecommendations = (props: ReduxProps) => {
  const retriever = new Retriever<{recommendations: Property[]}>(
    ENDPOINTS.PROPERTY.RECOMMENDED,
    props,
    properties => properties.recommendations,
  );
  return retriever.query();
};

export default getRecommendations;
