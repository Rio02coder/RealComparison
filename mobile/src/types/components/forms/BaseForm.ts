import React from 'react';
import {StyleProp, ViewStyle} from 'react-native';
import {InputStyle} from './input/Input';
import {FormikConfig} from 'formik';
import {ObjectSchema} from 'yup';
import {ObjectShape} from 'yup/lib/object';
import GeneralBackendFormErrorHandler from '../../../utilities/errors/backend/forms/General';
import RequireAtLeastOne from '../../RequireAtLeastOne';
import ErrorMapper from '../../utilities/errors/backend/ErrorMapper';

export enum FormTypes {
  LOGIN = 'Login',
  RESEND_EMAIL = 'Resend Email',
  SIGNUP = 'Sign Up',
  ADD_PROPERTY = 'Add Property',
  CHANGE_PROPERTY_IMAGES = 'Change Property Images',
  EDIT_PROFILE = 'Edit Profile',
  VALIDATE_OWNERSHIP = 'Validate',
  EDIT_PROPERTY_COOLING = 'Update Cooling',
  EDIT_PROPERTY_GARAGE = 'Update Garage',
  EDIT_PROPERTY_HEATING = 'Update Heating',
  EDIT_PROPERTY_BATHROOMS = 'Update Bathrooms',
  EDIT_PROPERTY_BEDROOMS = 'Update Bedrooms',
  EDIT_TYPE = 'Update Type',
  EDIT_LIVING_AREA = 'Update Living Area',
  EDIT_LATEST_SALE_PRICE = 'Update Latest Sale Price',
  EDIT_LATEST_SALE_DATE = 'Update Latest Sale Date',
  EDIT_LOT_SIZE = 'Update Lot Size',
  EDIT_PROPERTY_STORIES = 'Update Stories',
  CHANGE_PASSWORD = 'Change Password',
}

export interface Querier<T = any, D = any, F = any, S = D> {
  handler: GeneralBackendFormErrorHandler<D, F, T, S>;
  errorMapper?: ErrorMapper<D, S>;
}

export type SubmissionHandler<
  T = any,
  D = any,
  F = any,
  S = D,
> = RequireAtLeastOne<{
  requester: Querier<T, D, F, S>;
  onSubmit: FormikConfig<D>['onSubmit'];
}>;

/**
 * @type D Data format in which the client sends data to the backend.
 * @type T Data to be received from the backend after successful processing and conversion of sent request.
 * @type F Data to be returned back from the function reasoning over the received response from the backend.
 * @type S the data format the adapter is going to give from D.
 */
export default interface BaseFormProps<D = any, T = any, F = any, S = D> {
  name: FormTypes;
  style?: StyleProp<ViewStyle>;
  inputStyle?: InputStyle;
  initialValues: D;
  submissionHandler: SubmissionHandler<T, D, F, S>;
  children: React.ReactElement[] | React.ReactElement;
  shouldSubmit?: boolean | false;
  validationSchema?: ObjectSchema<ObjectShape>;
  stringifiedFormat?: boolean;
  /**
   * If provided, all the input children of this form will be asked to implement this action instead.
   */
  overridingAction?: Function;
  /**
   * If set to true, none of the fields of the form will be editable.
   */
  notEditable?: boolean;
  /**
   * If set to true, this field will not be displaying any errors.
   */
  hasNoError?: boolean;
}
