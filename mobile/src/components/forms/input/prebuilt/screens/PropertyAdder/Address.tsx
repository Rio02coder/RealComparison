import {InputType} from '../../../../../../types/components/forms/input/Input';
import PropertyAdderInput from './PropertyAdder';
import React from 'react';
import {PropertyAdderSpecificInputProps} from '../../../../../../types/components/forms/input/prebuilt/screens/PropertyAdder';

const PropertyAdderAddressInput: React.FC<
  PropertyAdderSpecificInputProps<InputType.TEXT>
> = props => (
  <PropertyAdderInput
    {...props}
    icon={'crosshairs-gps'}
    description={'Address'}
    inputType={InputType.TEXT}
    name={'street_address'}
  />
);

export default PropertyAdderAddressInput;
