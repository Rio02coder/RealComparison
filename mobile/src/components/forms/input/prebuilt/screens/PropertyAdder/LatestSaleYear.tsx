import {InputType} from '../../../../../../types/components/forms/input/Input';
import PropertyAdderInput from './PropertyAdder';
import React from 'react';
import {PropertyAdderSpecificInputProps} from '../../../../../../types/components/forms/input/prebuilt/screens/PropertyAdder';

const PropertyAdderLatestSaleYearInput: React.FC<
  PropertyAdderSpecificInputProps<InputType.TEXT>
> = props => (
  <PropertyAdderInput
    {...props}
    icon={'calendar'}
    description={'Latest Sale Year'}
    inputType={InputType.TEXT}
    props={{keyboard: 'numeric'}}
    name={'latest_sale_year'}
  />
);

export default PropertyAdderLatestSaleYearInput;
