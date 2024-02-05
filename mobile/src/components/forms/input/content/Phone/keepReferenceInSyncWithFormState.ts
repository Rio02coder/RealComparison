import {getPhoneData} from '../../../../../utilities/Normalisers/Phone';
import PhoneInput from 'react-native-phone-number-input';
import {FormikProps} from 'formik';
import getPhonePrefix from './getPhonePrefix';
import getPhoneCountryCode from './getPhoneCountryCode';
import updatePhoneReference from './updatePhoneReference';

const keepReferenceInSyncWithFormState = (
  phoneReference: PhoneInput | null,
  formikProps: FormikProps<any>,
  name: string,
) => {
  if (!phoneReference) {
    return;
  }
  const rawPhone: string = formikProps.values[name];
  const hasPrefix = rawPhone.startsWith('+');
  const phoneNumber = hasPrefix ? getPhoneData(rawPhone).phone : rawPhone;
  const phoneDataGatheringArguments: [PhoneInput, string, boolean] = [
    phoneReference,
    rawPhone,
    hasPrefix,
  ];
  const phonePrefix = getPhonePrefix(...phoneDataGatheringArguments);
  const phoneCountryCode = getPhoneCountryCode(...phoneDataGatheringArguments);
  updatePhoneReference(
    phoneReference,
    phoneNumber,
    phoneCountryCode,
    phonePrefix,
  );
};

export default keepReferenceInSyncWithFormState;
