/* istanbul ignore file */
import {Asserts} from 'yup';
import GeneralBackendFormErrorHandler from '../General';
import ReduxProps from '../../../../../types/redux/props';
import SessionChainErrorHandler from '../../SessionChainErrorHandler';
import getUserUpdatingSlice from '../../../../storage/ReduxTokenizer';
import ChainErrorHandler from '../../ChainErrorHandler';
import {Property, SpecificProperty} from '../../../../../types/Property';
import getGeneralRequester from './getGeneralRequester';
import {FormikErrors} from 'formik';
import {BackendError} from '../../../../../types/service/server';
// import {PropertyHeatingFormEntity} from '../../../../../components/forms/prebuilt/screens/Property/Heating';

export default class BackendPropertyFormErrorHandler<
  ValidationEntity extends Asserts<any>,
> extends GeneralBackendFormErrorHandler<
  ValidationEntity,
  void,
  SpecificProperty,
  ValidationEntity
> {
  private readonly getMessagesImplementation: (
    error: BackendError<ValidationEntity>,
  ) => FormikErrors<ValidationEntity>;

  constructor(
    propertyId: number,
    reduxProps: ReduxProps,
    setProperty: (property: Property) => void,
    getMessagesImplementation: (
      error: BackendError<ValidationEntity>,
    ) => FormikErrors<ValidationEntity>,
  ) {
    super(
      new SessionChainErrorHandler<
        ValidationEntity,
        ValidationEntity,
        SpecificProperty,
        void,
        ValidationEntity
      >(
        getUserUpdatingSlice(reduxProps),
        getGeneralRequester(propertyId, reduxProps, setProperty),
      ) as unknown as ChainErrorHandler<
        ValidationEntity,
        ValidationEntity,
        SpecificProperty,
        void,
        ValidationEntity
      >,
    );
    this.getMessagesImplementation = getMessagesImplementation;
  }

  public getMessages(): FormikErrors<ValidationEntity> {
    return this.getMessagesImplementation(this.getValidError());
  }
}
