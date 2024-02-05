import React from 'react';
import getPropertyGeneralFieldValidationRules from '../../../../../types/components/forms/prebuilt/screens/Property/validationRules/General';
import PropertyGeneralForm from './General';
import {BackendError} from '../../../../../types/service/server';
import {InferType, object} from 'yup';
import {FormTypes} from '../../../../../types/components/forms/BaseForm';

export const PropertyBathroomsValidationRules =
  getPropertyGeneralFieldValidationRules('num_of_bathrooms');
export const PropertyBathroomsSchema = object(PropertyBathroomsValidationRules);
export interface PropertyBathroomsFormEntity
  extends InferType<typeof PropertyBathroomsSchema> {}

const PropertyBathroomsForm: React.FC = () => (
  <PropertyGeneralForm
    formType={FormTypes.EDIT_PROPERTY_BATHROOMS}
    inputProps={{}}
    field={'num_of_bathrooms'}
    icon={'shower'}
    description={'Bathrooms'}
    getMessagesImplementation={(
      error: BackendError<PropertyBathroomsFormEntity>,
    ) => {
      switch (error.response.status) {
        default:
          // no specific field errors, just a general one will be displayed
          return {};
      }
    }}
  />
);

export default PropertyBathroomsForm;
