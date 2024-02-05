import AnimatedPropertyHeaderProps from './AnimatedPropertyHeader';
import {ScreenProps} from '../../Screen';
import {ScreenNames} from '../../ScreenNames';
import {SpecificProperty} from '../../Property';

export default interface CompletePropertyHeaderProps
  extends AnimatedPropertyHeaderProps,
    ScreenProps<ScreenNames.Property> {
  specificProperty: SpecificProperty;
}
