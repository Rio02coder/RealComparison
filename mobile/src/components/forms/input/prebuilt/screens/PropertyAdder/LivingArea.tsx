import {InputType} from '../../../../../../types/components/forms/input/Input';
import PropertyAdderInput from './PropertyAdder';
import React from 'react';
import {PropertyAdderSpecificInputProps} from '../../../../../../types/components/forms/input/prebuilt/screens/PropertyAdder';

const PropertyAdderLivingAreaInput: React.FC<
  PropertyAdderSpecificInputProps<InputType.TEXT>
> = props => (
  <PropertyAdderInput
    {...props}
    icon={'ruler-square'}
    description={'Living Area (sqm)'}
    inputType={InputType.TEXT}
    props={{keyboard: 'numeric'}}
    name={'living_area'}
  />
);

export default PropertyAdderLivingAreaInput;
