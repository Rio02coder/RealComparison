import React from 'react';
import getPropertyGeneralFieldValidationRules from '../../../../../types/components/forms/prebuilt/screens/Property/validationRules/General';
import PropertyGeneralForm from './General';
import {BackendError} from '../../../../../types/service/server';
import {InferType, object} from 'yup';
import {FormTypes} from '../../../../../types/components/forms/BaseForm';

export const PropertyLivingAreaValidationRules =
  getPropertyGeneralFieldValidationRules('living_area');
export const PropertyLivingAreaSchema = object(
  PropertyLivingAreaValidationRules,
);

export interface PropertyLivingAreaEntity
  extends InferType<typeof PropertyLivingAreaSchema> {}

const PropertyLivingAreaForm: React.FC = () => (
  <PropertyGeneralForm
    field={'living_area'}
    inputProps={{}}
    getMessagesImplementation={(
      error: BackendError<PropertyLivingAreaEntity>,
    ) => {
      switch (error.response.status) {
        default:
          // no specific field errors, just a general one will be displayed
          return {};
      }
    }}
    icon={'map'}
    description={'Living Area'}
    formType={FormTypes.EDIT_LIVING_AREA}
  />
);

export default PropertyLivingAreaForm;
