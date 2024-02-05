/* istanbul ignore file */
const readEntityField = <EntityType extends any>(
  entity: EntityType,
  fieldToRead: keyof EntityType,
): any => {
  const fieldValue = entity[fieldToRead];
  switch (typeof fieldValue) {
    case 'boolean':
      return fieldValue;
    default:
      return String(fieldValue);
  }
};

export default readEntityField;
