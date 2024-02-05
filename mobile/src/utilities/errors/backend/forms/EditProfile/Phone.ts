/* istanbul ignore file */
import {EditProfilePhoneFormEntity} from '../../../../../components/forms/prebuilt/screens/EditProfile/Phone';
import BackendEditProfileFormErrorHandler from './General';
import {FormikErrors} from 'formik';
import ReduxProps from '../../../../../types/redux/props';
import User from '../../../../../types/User';

export default class BackendEditProfilePhoneFormErrorHandler extends BackendEditProfileFormErrorHandler<EditProfilePhoneFormEntity> {
  public constructor(
    reduxProps: ReduxProps,
    completeEditProfile: (updatedUser: User) => void,
  ) {
    super(reduxProps, completeEditProfile, phoneForm => ({
      phone_number: phoneForm.phone,
    }));
  }

  getMessages(): FormikErrors<EditProfilePhoneFormEntity> {
    switch (this.getValidError().response.status) {
      default:
        // no specific field errors, just a general one will be displayed
        return {};
    }
  }
}
