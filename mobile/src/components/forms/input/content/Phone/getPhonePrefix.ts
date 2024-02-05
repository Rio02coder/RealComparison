import PhoneInput from 'react-native-phone-number-input';
import {getPhoneData} from '../../../../../utilities/Normalisers/Phone';

const getPhonePrefix = (
  phoneReference: PhoneInput,
  rawPhone: string,
  hasPrefix: boolean,
) =>
  hasPrefix
    ? getPhoneData(rawPhone).prefix.substring(1)
    : phoneReference.state.code;

export default getPhonePrefix;
