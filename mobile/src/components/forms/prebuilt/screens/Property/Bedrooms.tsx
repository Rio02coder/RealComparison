import React from 'react';
import getPropertyGeneralFieldValidationRules from '../../../../../types/components/forms/prebuilt/screens/Property/validationRules/General';
import PropertyGeneralForm from './General';
import {BackendError} from '../../../../../types/service/server';
import {InferType, object} from 'yup';
import {FormTypes} from '../../../../../types/components/forms/BaseForm';

export const PropertyBedroomsValidationRules =
  getPropertyGeneralFieldValidationRules('num_of_bedrooms');
export const PropertyBedroomsSchema = object(PropertyBedroomsValidationRules);
export interface PropertyBedroomsFormEntity
  extends InferType<typeof PropertyBedroomsSchema> {}

const PropertyBedroomsForm: React.FC = () => (
  <PropertyGeneralForm
    formType={FormTypes.EDIT_PROPERTY_BEDROOMS}
    inputProps={{}}
    field={'num_of_bedrooms'}
    icon={'bed'}
    description={'Bedrooms'}
    getMessagesImplementation={(
      error: BackendError<PropertyBedroomsFormEntity>,
    ) => {
      switch (error.response.status) {
        default:
          // no specific field errors, just a general one will be displayed
          return {};
      }
    }}
  />
);

export default PropertyBedroomsForm;
