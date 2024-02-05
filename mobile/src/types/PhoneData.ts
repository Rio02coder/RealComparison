import {CountryCode} from './CountryCode/countryCode';

type PhoneData = {
  phone: string;
  prefix: string;
  countryCode: CountryCode | undefined;
};

export default PhoneData;
