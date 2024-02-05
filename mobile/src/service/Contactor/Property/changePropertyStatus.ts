/* istanbul ignore file */
import ConcreteProperty from '../../../types/ConcreteProperty';
import ReduxProps from '../../../types/redux/props';
import SessionManager from '../../../utilities/errors/backend/SessionManager';

/**
 * This method changes the status of a property.
 * This includes changing its owner or declaring it's for sale.
 * @param property
 * @param url
 * @param props
 * @param payload
 */
export const changePropertyStatusManager = (
  property: ConcreteProperty,
  url: string,
  props: ReduxProps,
  payload?: string,
) => {
  const payloadToSend = payload ? payload : property.getFavoritesJSON();
  const request = new SessionManager<string, void>(
    payloadToSend,
    url,
    'POST',
    props,
    undefined,
  );
  return request.query();
};
