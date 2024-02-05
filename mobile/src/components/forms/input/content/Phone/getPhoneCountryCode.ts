import PhoneInput from 'react-native-phone-number-input';
import {getPhoneData} from '../../../../../utilities/Normalisers/Phone';

const getPhoneCountryCode = (
  phoneReference: PhoneInput,
  rawPhone: string,
  hasPrefix: boolean,
) =>
  hasPrefix
    ? getPhoneData(rawPhone).countryCode
    : phoneReference.state.countryCode;

export default getPhoneCountryCode;
