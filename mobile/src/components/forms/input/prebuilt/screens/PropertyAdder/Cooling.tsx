import {InputType} from '../../../../../../types/components/forms/input/Input';
import PropertyAdderInput from './PropertyAdder';
import React from 'react';
import {PropertyAdderSpecificInputProps} from '../../../../../../types/components/forms/input/prebuilt/screens/PropertyAdder';

const PropertyAdderCoolingInput: React.FC<
  PropertyAdderSpecificInputProps<InputType.SWITCH>
> = props => (
  <PropertyAdderInput
    {...props}
    icon={'snowflake'}
    description={'Has Cooling'}
    inputType={InputType.SWITCH}
    name={'has_cooling'}
  />
);

export default PropertyAdderCoolingInput;
