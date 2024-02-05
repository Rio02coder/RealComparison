import PhoneInput from 'react-native-phone-number-input';
import {CountryCode} from '../../../../../types/CountryCode/countryCode';
import updatePhonePrefix from './updatePhonePrefix';

const updatePhoneReference = (
  phoneReference: PhoneInput,
  phoneNumber: string,
  phoneCountryCode: CountryCode,
  phonePrefix?: string,
) => {
  phoneReference.setState(
    {
      number: phoneNumber,
      countryCode:
        phoneCountryCode as typeof phoneReference.state['countryCode'],
    },
    () => updatePhonePrefix(phoneReference, phonePrefix),
  );
};

export default updatePhoneReference;
