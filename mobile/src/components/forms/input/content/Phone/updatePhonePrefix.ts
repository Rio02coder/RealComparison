import PhoneInput from 'react-native-phone-number-input';

const updatePhonePrefix = (
  phoneReference: PhoneInput,
  phonePrefix?: string,
) => {
  if (!phonePrefix) {
    return;
  }
  phoneReference.setState({code: phonePrefix});
};

export default updatePhonePrefix;
