import {ScreenProps} from '../../Screen';
import {ScreenNames} from '../../ScreenNames';
import AnimatedScrollProps from '../AnimatedScroll';
import PropertyProfileProps from './Profile';
import {SpecificProperty} from '../../Property';

export default interface PropertyBodyProps
  extends ScreenProps<ScreenNames.Property> {
  scrollY: AnimatedScrollProps['scrollY'];
  isUserOwnerOfThisProperty?: PropertyProfileProps['isUserOwnerOfThisProperty'];
  property: SpecificProperty;
};
