import {InferType} from 'yup';
import {InputStyle} from '../../input/Input';
import {StyleProp, ViewStyle} from 'react-native';
import RequireAtLeastOne from '../../../../RequireAtLeastOne';
import {ImageSliderPreviewsSchema} from '../../../../../components/forms/standalone/imagePicker/ImageSlider';
import ReduxProps from '../../../../redux/props';

export default interface ImageSliderProps {
  isInspectedByOwner?: boolean;
  previews: string[];
  styles?: RequireAtLeastOne<{
    form: StyleProp<ViewStyle>;
    input: InputStyle;
  }>;
  reduxProps: ReduxProps;
  propertyId: number;
};

export interface ImageSliderPreviewsValidationSchema
  extends InferType<typeof ImageSliderPreviewsSchema> {}

export interface PropertyProfilePatch {
  property_id: number;
  images: string[];
}
