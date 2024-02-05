import {Property} from '../../types/Property';
import requestSpecificProperty from '../../service/Contactor/Property/Property';
import ReduxProps from '../../types/redux/props';
import {tags} from '../../types/redux/Tags';
import PhotographedEntity from '../../types/PhotographedEntity';
import ConcreteProperty from '../../types/ConcreteProperty';
import {changePropertyStatusManager} from '../../service/Contactor/Property/changePropertyStatus';
import ENDPOINTS from '../../service/endpoints';
import {successfulTransferUserAlert} from '../../components/search/Alerts';

export const setUpdatedProperty = (
  reduxProps: ReduxProps,
  propertyID: number,
  setNewProperty: (property: Property) => void,
) => {
  requestSpecificProperty(reduxProps, propertyID).then(property =>
    setNewProperty(property),
  );
};

export const removeOwnedPropertyManager = (
  property: Property,
  reduxProps: ReduxProps,
  setNewProperty: (property: Property) => void,
) => {
  reduxProps.removeOwnedProperties([property]);
  setUpdatedProperty(reduxProps, property.id, setNewProperty);
};

export const addOwnedPropertyManager = (
  property: Property,
  reduxProps: ReduxProps,
  setNewProperty: (property: Property) => void,
) => {
  reduxProps.addOwnedProperties([property]);
  setUpdatedProperty(reduxProps, property.id, setNewProperty);
};

export const tansferOwnedPropertyManager = (
  property: Property,
  reduxProps: ReduxProps,
  setNewProperty: (property: Property) => void,
  userEmail: string,
) => {
  const concreteProperty = new ConcreteProperty(property);
  const payload = concreteProperty.getTransferOwnershipJSON(userEmail);
  changePropertyStatusManager(
    concreteProperty,
    ENDPOINTS.PROPERTY.TRANSFER_OWNERSHIP,
    reduxProps,
    payload,
  ).then(() => {
    removeOwnedPropertyManager(property, reduxProps, setNewProperty);
    successfulTransferUserAlert(userEmail);
  });
};

export const getOwnedProperty = (
  propertyID: number,
  reduxProps: ReduxProps,
) => {
  const ownedProperties = reduxProps.properties.get(tags.OWNED) as Property[];
  return ownedProperties.find(property => property.id === propertyID);
};

export const updateOwnedProperty = (
  propertyToUpdate: Property,
  reduxProps: ReduxProps,
) => {
  reduxProps.updateProperties([propertyToUpdate]);
};

export const updateOwnedPropertyImage = (
  propertyID: number,
  reduxProps: ReduxProps,
  newImages: PhotographedEntity,
) => {
  console.log('updateOwnedPropertyImage');
  const ownedProperty = getOwnedProperty(propertyID, reduxProps) as Property;
  const updatedOwnedProperty = {
    ...ownedProperty,
    image_urls: newImages.image_urls,
  };
  updateOwnedProperty(updatedOwnedProperty, reduxProps);
};
