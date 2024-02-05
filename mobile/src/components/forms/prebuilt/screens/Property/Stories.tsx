import React from 'react';
import getPropertyGeneralFieldValidationRules from '../../../../../types/components/forms/prebuilt/screens/Property/validationRules/General';
import PropertyGeneralForm from './General';
import {BackendError} from '../../../../../types/service/server';
import {InferType, object} from 'yup';
import {FormTypes} from '../../../../../types/components/forms/BaseForm';

export const PropertyStoriesValidationRules =
  getPropertyGeneralFieldValidationRules('num_of_stories');
export const PropertyStoriesSchema = object(PropertyStoriesValidationRules);
export interface PropertyStoriesFormEntity
  extends InferType<typeof PropertyStoriesSchema> {}

const PropertyStoriesForm: React.FC = () => (
  <PropertyGeneralForm
    formType={FormTypes.EDIT_PROPERTY_STORIES}
    field={'num_of_stories'}
    icon={'book-open-page-variant'}
    description={'Stories'}
    getMessagesImplementation={(
      error: BackendError<PropertyStoriesFormEntity>,
    ) => {
      switch (error.response.status) {
        default:
          // no specific field errors, just a general one will be displayed
          return {};
      }
    }}
  />
);

export default PropertyStoriesForm;
