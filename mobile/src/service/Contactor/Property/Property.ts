/* istanbul ignore file */
import ReduxProps from '../../../types/redux/props';
import SessionManager from '../../../utilities/errors/backend/SessionManager';
import {SpecificProperty} from '../../../types/Property';
import ENDPOINTS from '../../endpoints';

const requestSpecificProperty = (reduxProps: ReduxProps, id: number) => {
  const specificPropertySession = new SessionManager<
    undefined,
    SpecificProperty,
    SpecificProperty
  >(
    undefined,
    `${ENDPOINTS.PROPERTY.SPECIFIC}${id}/`,
    'GET',
    reduxProps,
    value => value,
  );
  return specificPropertySession.query();
};

export default requestSpecificProperty;
