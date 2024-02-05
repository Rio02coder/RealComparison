import {InputType} from '../../../../../../types/components/forms/input/Input';
import PropertyAdderInput from './PropertyAdder';
import React from 'react';
import {PropertyAdderSpecificInputProps} from '../../../../../../types/components/forms/input/prebuilt/screens/PropertyAdder';

const PropertyAdderCityInput: React.FC<
  PropertyAdderSpecificInputProps<InputType.TEXT>
> = props => (
  <PropertyAdderInput
    {...props}
    icon={'city'}
    description={'City'}
    inputType={InputType.TEXT}
    name={'city'}
  />
);

export default PropertyAdderCityInput;
