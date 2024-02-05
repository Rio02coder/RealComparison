/* istanbul ignore file */
import ImagePicker from 'react-native-image-crop-picker';

export const PROPERTY_PROFILE_WIDTH = 1024;
export const PROPERTY_PROFILE_HEIGHT = 683;
export const PROPERTY_PROFILE_RATIO =
  PROPERTY_PROFILE_WIDTH / PROPERTY_PROFILE_HEIGHT;

const generatePropertyPicture = async (
  camera: boolean = false,
): Promise<string> => {
  const {openCamera, openPicker} = ImagePicker;
  const imageFetchingMethod = camera ? openCamera : openPicker;
  const selectedImage = await imageFetchingMethod({
    mediaType: 'photo',
    includeBase64: true,
    cropping: true,
    width: PROPERTY_PROFILE_WIDTH,
    height: PROPERTY_PROFILE_HEIGHT,
  });
  const rawData = selectedImage.data as string;
  const encoding = selectedImage.mime;
  return `data:${encoding};base64,${rawData}`;
};

export default generatePropertyPicture;
