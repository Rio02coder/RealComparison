import {InputType} from '../../../../../../types/components/forms/input/Input';
import PropertyAdderInput from './PropertyAdder';
import React from 'react';
import {PropertyAdderSpecificInputProps} from '../../../../../../types/components/forms/input/prebuilt/screens/PropertyAdder';
import {typeData} from '../../../../../../utilities/search/filters/FilterData';
import getModifiedData from '../../../../../../utilities/search/filters/getModifiedData';

const PropertyAdderTypeInput: React.FC<
  PropertyAdderSpecificInputProps<InputType.STRING_PICKER>
> = props => (
  <PropertyAdderInput
    {...props}
    props={{data: getModifiedData(typeData)}}
    icon={'city'}
    description={'Type'}
    inputType={InputType.STRING_PICKER}
    name={'type'}
  />
);

export default PropertyAdderTypeInput;
