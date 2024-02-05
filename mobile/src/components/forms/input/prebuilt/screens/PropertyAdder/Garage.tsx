import {InputType} from '../../../../../../types/components/forms/input/Input';
import PropertyAdderInput from './PropertyAdder';
import React from 'react';
import {PropertyAdderSpecificInputProps} from '../../../../../../types/components/forms/input/prebuilt/screens/PropertyAdder';

const PropertyAdderGarageInput: React.FC<
  PropertyAdderSpecificInputProps<InputType.SWITCH>
> = props => (
  <PropertyAdderInput
    {...props}
    icon={'garage'}
    description={'Has Garage'}
    inputType={InputType.SWITCH}
    name={'has_garage'}
  />
);

export default PropertyAdderGarageInput;
