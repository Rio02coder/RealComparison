import UpdateFieldPropertiesMethod from '../../../../../types/components/forms/input/content/imagePicker/UpdateFieldPropertiesMethod';
import {ImageSliderPreviewsValidationSchema} from '../../../../../types/components/forms/standalone/imagePicker/ImageSlider';

const isPictureRemovable = (
  pictureToRemove: number,
  getDisplayableProperties: () => string[],
) =>
  pictureToRemove >= 0 && pictureToRemove < getDisplayableProperties().length;

const hasPictureBeenRecentlyAdded = (
  pictureToCheck: number,
  getAllFieldProperties: () => ImageSliderPreviewsValidationSchema,
) => pictureToCheck >= getAllFieldProperties().current.length;

const removeRecentlyAddedPropertyPicture = (
  recentlyAddedPictureToRemove: number,
  getAllFieldProperties: () => ImageSliderPreviewsValidationSchema,
  updateFieldPropertiesMethod: UpdateFieldPropertiesMethod,
) => {
  const currentRecentlyAddedPropertyPictures = getAllFieldProperties().added;
  currentRecentlyAddedPropertyPictures.splice(recentlyAddedPictureToRemove, 1);
  updateFieldPropertiesMethod({
    added: currentRecentlyAddedPropertyPictures,
  });
};

const removeCurrentPropertyPicture = (
  currentPictureToRemove: number,
  getAllFieldProperties: () => ImageSliderPreviewsValidationSchema,
  updateFieldPropertiesMethod: UpdateFieldPropertiesMethod,
) => {
  const currentPropertyPictures = getAllFieldProperties().current;
  const removedPropertyPicture =
    currentPropertyPictures[currentPictureToRemove];
  currentPropertyPictures.splice(currentPictureToRemove, 1);
  updateFieldPropertiesMethod({
    current: currentPropertyPictures,
    removed: [...getAllFieldProperties().removed, removedPropertyPicture],
  });
};

const removePropertyPicture = (
  pictureToRemove: number,
  getDisplayableProperties: () => string[],
  getAllFieldProperties: () => ImageSliderPreviewsValidationSchema,
  updateFieldPropertiesMethod: UpdateFieldPropertiesMethod,
) => {
  if (!isPictureRemovable(pictureToRemove, getDisplayableProperties)) {
    return;
  }
  if (hasPictureBeenRecentlyAdded(pictureToRemove, getAllFieldProperties)) {
    removeRecentlyAddedPropertyPicture(
      getRelativeAddedPictureToRemove(pictureToRemove, getAllFieldProperties),
      getAllFieldProperties,
      updateFieldPropertiesMethod,
    );
    return;
  }
  removeCurrentPropertyPicture(
    pictureToRemove,
    getAllFieldProperties,
    updateFieldPropertiesMethod,
  );
};

const getRelativeAddedPictureToRemove = (
  absolutePictureToRemove: number,
  getAllFieldProperties: () => ImageSliderPreviewsValidationSchema,
) => absolutePictureToRemove - getAllFieldProperties().current.length;

export default removePropertyPicture;
