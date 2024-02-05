import ImageSliderProps from '../forms/standalone/imagePicker/ImageSlider';
import {ScreenProps} from '../../Screen';
import {ScreenNames} from '../../ScreenNames';
import {Property} from '../../Property';

export default interface PropertyProfileProps
  extends ScreenProps<ScreenNames.Property> {
  property: Property;
  isUserOwnerOfThisProperty?: ImageSliderProps['isInspectedByOwner'];
}
