import {InputType} from '../../../../../../types/components/forms/input/Input';
import PropertyAdderInput from './PropertyAdder';
import React from 'react';
import {PropertyAdderSpecificInputProps} from '../../../../../../types/components/forms/input/prebuilt/screens/PropertyAdder';

const PropertyAdderLotSizeInput: React.FC<
  PropertyAdderSpecificInputProps<InputType.TEXT>
> = props => (
  <PropertyAdderInput
    {...props}
    icon={'ruler-square'}
    description={'Lot Size (sqm)'}
    inputType={InputType.TEXT}
    props={{keyboard: 'numeric'}}
    name={'lot_size'}
  />
);

export default PropertyAdderLotSizeInput;
