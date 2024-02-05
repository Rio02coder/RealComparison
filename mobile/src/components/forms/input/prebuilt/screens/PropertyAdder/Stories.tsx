import {InputType} from '../../../../../../types/components/forms/input/Input';
import PropertyAdderInput from './PropertyAdder';
import React from 'react';
import {PropertyAdderSpecificInputProps} from '../../../../../../types/components/forms/input/prebuilt/screens/PropertyAdder';

const PropertyAdderStoriesInput: React.FC<
  PropertyAdderSpecificInputProps<InputType.TEXT>
> = props => (
  <PropertyAdderInput
    {...props}
    icon={'stairs'}
    description={'Stories'}
    inputType={InputType.TEXT}
    props={{keyboard: 'numeric'}}
    name={'num_of_stories'}
  />
);

export default PropertyAdderStoriesInput;
