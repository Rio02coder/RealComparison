/* istanbul ignore file */
import Requester from '../../../../../service/Requester';
import {backend} from '../../../../../service/server';
import ENDPOINTS from '../../../../../service/endpoints';
import {updateOwnedProperty} from '../../../../property/OwnedPropertyManager';
import {Property, SpecificProperty} from '../../../../../types/Property';
import {Asserts} from 'yup';
import ReduxProps from '../../../../../types/redux/props';

const getGeneralRequester = <ValidationEntity extends Asserts<any>>(
  propertyId: number,
  reduxProps: ReduxProps,
  setProperty: (property: Property) => void,
) => {
  return new Requester<
    ValidationEntity,
    SpecificProperty,
    void,
    ValidationEntity
  >({
    api: backend(),
    responseHandler: updatedPropertyPayload => {
      setProperty(updatedPropertyPayload);
      updateOwnedProperty(updatedPropertyPayload, reduxProps);
    },
    config: {
      method: 'PATCH',
      url: `${ENDPOINTS.PROPERTY.UPDATE}${propertyId}`,
    },
  });
};

export default getGeneralRequester;
