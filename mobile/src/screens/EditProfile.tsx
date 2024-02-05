import React from 'react';
import {View} from 'react-native';
import connector from '../redux/connector';
import appStyles from '../styles/screens/Themes';
import {ScreenProps} from '../types/Screen';
import {ScreenNames} from '../types/ScreenNames';
import EditProfileNamesForm from '../components/forms/prebuilt/screens/EditProfile/Names';
import EditProfileEmailForm from '../components/forms/prebuilt/screens/EditProfile/Email';
import EditProfilePhoneForm from '../components/forms/prebuilt/screens/EditProfile/Phone';
import OAuthenticator from '../utilities/authentication/OAuthenticator';
import {InferType, object, string} from 'yup';
import {ObjectShape} from 'yup/lib/object';
import {phoneRegexValidator} from '../utilities/validation/forms/Phone';

export const EditProfileValidationRules: ObjectShape = {
  email: string().required('Email Required').email('Invalid Email'),
  firstName: string().required('First Name Required'),
  lastName: string().required('Last Name Required'),
  phone: string()
    .required('Phone Required')
    .matches(phoneRegexValidator, 'Phone must be valid'),
};

export const EditProfileSchema = object(EditProfileValidationRules);

export interface EditProfileFormEntity
  extends InferType<typeof EditProfileSchema> {}

export const EditProfileContext =
  React.createContext<ScreenProps<ScreenNames.EditProfile> | null>(null);

const EditProfile: React.FC<ScreenProps<ScreenNames.EditProfile>> = props => {
  const service = props.user?.service;
  return (
    <View
      testID="editprofile_view"
      style={[appStyles.mainAppTheme, {justifyContent: 'center'}]}>
      <EditProfileContext.Provider value={props}>
        <View testID="form_parent">
          <EditProfileNamesForm />
          {service === OAuthenticator && <EditProfileEmailForm />}
          <EditProfilePhoneForm />
        </View>
      </EditProfileContext.Provider>
    </View>
  );
};

export default connector(EditProfile);
