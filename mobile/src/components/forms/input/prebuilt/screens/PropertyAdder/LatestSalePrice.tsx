import {InputType} from '../../../../../../types/components/forms/input/Input';
import PropertyAdderInput from './PropertyAdder';
import React from 'react';
import {PropertyAdderSpecificInputProps} from '../../../../../../types/components/forms/input/prebuilt/screens/PropertyAdder';

const PropertyAdderLatestSalePriceInput: React.FC<
  PropertyAdderSpecificInputProps<InputType.TEXT>
> = props => (
  <PropertyAdderInput
    {...props}
    icon={'cash-multiple'}
    description={'Latest Sale Price'}
    inputType={InputType.TEXT}
    props={{keyboard: 'numeric'}}
    name={'latest_sale_price'}
  />
);

export default PropertyAdderLatestSalePriceInput;
