import React from 'react';
import getPropertyGeneralFieldValidationRules from '../../../../../types/components/forms/prebuilt/screens/Property/validationRules/General';
import PropertyGeneralForm from './General';
import {BackendError} from '../../../../../types/service/server';
import {InferType, object} from 'yup';
import {FormTypes} from '../../../../../types/components/forms/BaseForm';

export const PropertyLatestSalePriceValidationRules =
  getPropertyGeneralFieldValidationRules('latest_sale_price');
export const PropertyLatestSalePriceSchema = object(
  PropertyLatestSalePriceValidationRules,
);

export interface PropertyLatestSalePriceEntity
  extends InferType<typeof PropertyLatestSalePriceSchema> {}

const PropertyLatestSalePriceForm: React.FC = () => (
  <PropertyGeneralForm
    field={'latest_sale_price'}
    inputProps={{}}
    getMessagesImplementation={(
      error: BackendError<PropertyLatestSalePriceEntity>,
    ) => {
      switch (error.response.status) {
        default:
          // no specific field errors, just a general one will be displayed
          return {};
      }
    }}
    icon={'credit-card-chip-outline'}
    description={'Latest Sale Price'}
    formType={FormTypes.EDIT_LATEST_SALE_PRICE}
  />
);

export default PropertyLatestSalePriceForm;
