import generatePropertyPicture from '../../../../../types/utilities/storage/generatePropertyPicture';
import UpdateFieldPropertiesMethod from '../../../../../types/components/forms/input/content/imagePicker/UpdateFieldPropertiesMethod';

const isProfilePictureNew = (
  addedProfilePicture: string,
  addedFieldProperties: string[],
) => !addedFieldProperties.includes(addedProfilePicture);

const addPropertyPicture = async (
  camera: boolean,
  addedFieldProperties: string[],
  updateFieldPropertiesMethod: UpdateFieldPropertiesMethod,
) => {
  const propertyPicture = await generatePropertyPicture(camera);
  if (!isProfilePictureNew(propertyPicture, addedFieldProperties)) {
    return;
  }
  updateFieldPropertiesMethod({
    added: [...addedFieldProperties, propertyPicture],
  });
};

export default addPropertyPicture;
