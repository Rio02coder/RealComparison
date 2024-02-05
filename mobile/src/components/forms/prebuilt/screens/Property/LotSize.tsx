import React from 'react';
import getPropertyGeneralFieldValidationRules from '../../../../../types/components/forms/prebuilt/screens/Property/validationRules/General';
import PropertyGeneralForm from './General';
import {BackendError} from '../../../../../types/service/server';
import {InferType, object} from 'yup';
import {FormTypes} from '../../../../../types/components/forms/BaseForm';

export const PropertyLotSizeValidationRules =
  getPropertyGeneralFieldValidationRules('lot_size');
export const PropertyLotSizeSchema = object(PropertyLotSizeValidationRules);

export interface PropertyLotSizeFormEntity
  extends InferType<typeof PropertyLotSizeSchema> {}

const PropertyLotSizeForm: React.FC = () => (
  <PropertyGeneralForm
    field={'lot_size'}
    inputProps={{}}
    getMessagesImplementation={(
      error: BackendError<PropertyLotSizeFormEntity>,
    ) => {
      switch (error.response.status) {
        default:
          // no specific field errors, just a general one will be displayed
          return {};
      }
    }}
    icon={'floor-plan'}
    description={'Lot Size'}
    formType={FormTypes.EDIT_LOT_SIZE}
  />
);

export default PropertyLotSizeForm;
