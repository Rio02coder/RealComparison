import {InputType} from '../../../../../../types/components/forms/input/Input';
import PropertyAdderInput from './PropertyAdder';
import React from 'react';
import {PropertyAdderSpecificInputProps} from '../../../../../../types/components/forms/input/prebuilt/screens/PropertyAdder';

const PropertyAdderHeatingInput: React.FC<
  PropertyAdderSpecificInputProps<InputType.SWITCH>
> = props => (
  <PropertyAdderInput
    {...props}
    icon={'thermometer'}
    description={'Has Heating'}
    inputType={InputType.SWITCH}
    name={'has_heating'}
  />
);

export default PropertyAdderHeatingInput;
