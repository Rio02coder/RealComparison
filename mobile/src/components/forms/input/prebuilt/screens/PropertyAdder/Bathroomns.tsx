import {InputType} from '../../../../../../types/components/forms/input/Input';
import PropertyAdderInput from './PropertyAdder';
import React from 'react';
import {PropertyAdderSpecificInputProps} from '../../../../../../types/components/forms/input/prebuilt/screens/PropertyAdder';

const PropertyAdderBathroomsInput: React.FC<
  PropertyAdderSpecificInputProps<InputType.TEXT>
> = props => (
  <PropertyAdderInput
    {...props}
    icon={'shower'}
    description={'Bathrooms'}
    inputType={InputType.TEXT}
    props={{keyboard: 'numeric'}}
    name={'num_of_bathrooms'}
  />
);

export default PropertyAdderBathroomsInput;
