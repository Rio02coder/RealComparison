import React from 'react';
import getPropertyGeneralFieldValidationRules from '../../../../../types/components/forms/prebuilt/screens/Property/validationRules/General';
import PropertyGeneralForm from './General';
import {BackendError} from '../../../../../types/service/server';
import {InferType, object} from 'yup';
import {FormTypes} from '../../../../../types/components/forms/BaseForm';

export const PropertyCoolingValidationRules =
  getPropertyGeneralFieldValidationRules('has_cooling');
export const PropertyCoolingSchema = object(PropertyCoolingValidationRules);
export interface PropertyCoolingFormEntity
  extends InferType<typeof PropertyCoolingSchema> {}

const PropertyCoolingForm: React.FC = () => (
  <PropertyGeneralForm
    formType={FormTypes.EDIT_PROPERTY_COOLING}
    inputProps={{}}
    field={'has_cooling'}
    icon={'snowflake'}
    description={'Has Cooling'}
    getMessagesImplementation={(
      error: BackendError<PropertyCoolingFormEntity>,
    ) => {
      switch (error.response.status) {
        default:
          // no specific field errors, just a general one will be displayed
          return {};
      }
    }}
  />
);

export default PropertyCoolingForm;
