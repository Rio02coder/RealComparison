import {PropertyUpdaterActions} from '../../../types/redux/payloads/PropertyUpdator';
import {tags} from '../../../types/redux/Tags';
import PropertiesState from '../../../types/redux/states/PropertiesState';
import {Property} from '../../../types/Property';

const isPropertyInTag = (
  tag: tags,
  property: Property,
  propertiesState: PropertiesState,
) =>
  (propertiesState.get(tag) as Property[])
    .map(propertyPayload => propertyPayload.id)
    .includes(property.id);

const propertyPayloadUpdater = (
  propertiesState: PropertiesState,
  propertiesPayload: Property[],
  actionType: PropertyUpdaterActions,
  tagsToUpdate: tags[] = [],
): PropertiesState => {
  const propertyPayloadIDs = propertiesPayload.map(property => property.id);
  switch (actionType) {
    case PropertyUpdaterActions.ADD:
      propertiesState.forEach((properties, tag) => {
        if (tagsToUpdate.includes(tag)) {
          const newPropertyPayload = propertiesPayload.filter(
            propertyPayload =>
              !isPropertyInTag(tag, propertyPayload, propertiesState),
          );
          return propertiesState.set(tag, [
            ...properties,
            ...newPropertyPayload,
          ]);
        } else {
          return propertiesState.set(tag, properties);
        }
      });
      return propertiesState;
    case PropertyUpdaterActions.REMOVE:
      propertiesState.forEach((properties, tag) => {
        tagsToUpdate.includes(tag)
          ? propertiesState.set(
              tag,
              properties.filter(
                property => !propertyPayloadIDs.includes(property.id),
              ),
            )
          : propertiesState.set(tag, properties);
      });
      return propertiesState;
    case PropertyUpdaterActions.REMOVE_ALL:
      propertiesState.forEach((_properties, tag) => {
        propertiesState.set(tag, []);
      });
    case PropertyUpdaterActions.UPDATE:
      propertiesState.forEach((properties, tag) => {
        tagsToUpdate.includes(tag)
          ? propertiesState.set(
              tag,
              properties.map(
                property =>
                  propertiesPayload.find(
                    propertyPayload => propertyPayload.id === property.id,
                  ) || property,
              ),
            )
          : propertiesState.set(tag, properties);
      });
    default: {
      return propertiesState;
    }
  }
};

export default propertyPayloadUpdater;
