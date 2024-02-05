import React from 'react';
import {InferType, object} from 'yup';
import PropertyGeneralForm from './General';
import {BackendError} from '../../../../../types/service/server';
import getPropertyGeneralFieldValidationRules from '../../../../../types/components/forms/prebuilt/screens/Property/validationRules/General';
import {FormTypes} from '../../../../../types/components/forms/BaseForm';

export const PropertyGarageValidationRules =
  getPropertyGeneralFieldValidationRules('has_garage');
export const PropertyGarageSchema = object(PropertyGarageValidationRules);
export interface PropertyGarageFormEntity
  extends InferType<typeof PropertyGarageSchema> {}

const PropertyGarageForm: React.FC = () => (
  <PropertyGeneralForm
    formType={FormTypes.EDIT_PROPERTY_GARAGE}
    inputProps={{}}
    field={'has_garage'}
    icon={'garage'}
    description={'Has Garage'}
    getMessagesImplementation={(
      error: BackendError<PropertyGarageFormEntity>,
    ) => {
      switch (error.response.status) {
        default:
          // no specific field errors, just a general one will be displayed
          return {};
      }
    }}
  />
);

export default PropertyGarageForm;
