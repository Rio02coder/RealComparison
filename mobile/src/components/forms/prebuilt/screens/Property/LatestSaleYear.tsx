import React from 'react';
import getPropertyGeneralFieldValidationRules from '../../../../../types/components/forms/prebuilt/screens/Property/validationRules/General';
import PropertyGeneralForm from './General';
import {BackendError} from '../../../../../types/service/server';
import {InferType, object} from 'yup';
import {FormTypes} from '../../../../../types/components/forms/BaseForm';

export const PropertyLatestSaleDateValidationRules =
  getPropertyGeneralFieldValidationRules('latest_sale_year');
export const PropertyLatestSaleDateSchema = object(
  PropertyLatestSaleDateValidationRules,
);

export interface PropertyLatestSaleDateEntity
  extends InferType<typeof PropertyLatestSaleDateSchema> {}

const PropertyLatestSaleYearForm: React.FC = () => (
  <PropertyGeneralForm
    field={'latest_sale_year'}
    inputProps={{}}
    getMessagesImplementation={(
      error: BackendError<PropertyLatestSaleDateEntity>,
    ) => {
      switch (error.response.status) {
        default:
          // no specific field errors, just a general one will be displayed
          return {};
      }
    }}
    icon={'calendar'}
    description={'Latest Sale Year'}
    formType={FormTypes.EDIT_LATEST_SALE_DATE}
  />
);

export default PropertyLatestSaleYearForm;
