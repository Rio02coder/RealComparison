import React from 'react';
import {InferType, object} from 'yup';
import getPropertyGeneralFieldValidationRules from '../../../../../types/components/forms/prebuilt/screens/Property/validationRules/General';
import PropertyGeneralForm from './General';
import {BackendError} from '../../../../../types/service/server';
import {FormTypes} from '../../../../../types/components/forms/BaseForm';

export const PropertyHeatingValidationRules =
  getPropertyGeneralFieldValidationRules('has_heating');
export const PropertyHeatingSchema = object(PropertyHeatingValidationRules);
export interface PropertyHeatingFormEntity
  extends InferType<typeof PropertyHeatingSchema> {}

const PropertyHeatingForm: React.FC = () => (
  <PropertyGeneralForm
    formType={FormTypes.EDIT_PROPERTY_HEATING}
    inputProps={{}}
    field={'has_heating'}
    icon={'thermometer'}
    description={'Has Heating'}
    getMessagesImplementation={(
      error: BackendError<PropertyHeatingFormEntity>,
    ) => {
      switch (error.response.status) {
        default:
          // no specific field errors, just a general one will be displayed
          return {};
      }
    }}
  />
);

export default PropertyHeatingForm;
