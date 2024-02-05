import React from 'react';
import getPropertyGeneralFieldValidationRules from '../../../../../types/components/forms/prebuilt/screens/Property/validationRules/General';
import PropertyGeneralForm from './General';
import {BackendError} from '../../../../../types/service/server';
import {InferType, object} from 'yup';
import {FormTypes} from '../../../../../types/components/forms/BaseForm';
import getModifiedData from '../../../../../utilities/search/filters/getModifiedData';
import {typeData} from '../../../../../utilities/search/filters/FilterData';
import {wp} from '../../../../../types/Screen';

export const PropertyTypeValidationRules =
  getPropertyGeneralFieldValidationRules('type');
export const PropertyTypeSchema = object(PropertyTypeValidationRules);

export interface PropertyTypeFormEntity
  extends InferType<typeof PropertyTypeSchema> {}

const PropertyTypeForm: React.FC = () => (
  <PropertyGeneralForm
    style={{width: wp(45)}}
    field={'type'}
    inputProps={{data: getModifiedData(typeData)}}
    getMessagesImplementation={(
      error: BackendError<PropertyTypeFormEntity>,
    ) => {
      switch (error.response.status) {
        default:
          // no specific field errors, just a general one will be displayed
          return {};
      }
    }}
    icon={'city'}
    description={'Type'}
    formType={FormTypes.EDIT_TYPE}
  />
);

export default PropertyTypeForm;
