import PhoneData from '../../types/PhoneData';
import {parsePhoneNumber} from 'libphonenumber-js';
import {CountryCode} from '../../types/CountryCode/countryCode';

export const getPhoneData = (phone: string): PhoneData => {
  const prefix = `+${parsePhoneNumber(phone).countryCallingCode}`;
  return {
    phone: phone.substring(prefix.length),
    prefix: `+${parsePhoneNumber(phone).countryCallingCode}`,
    countryCode: parsePhoneNumber(phone).country as CountryCode,
  };
};
