/* istanbul ignore file */
import {FormikErrors} from 'formik';
import {EditProfileNamesFormEntity} from '../../../../../components/forms/prebuilt/screens/EditProfile/Names';
import BackendEditProfileFormErrorHandler from './General';
import ReduxProps from '../../../../../types/redux/props';
import User from '../../../../../types/User';

export default class BackendEditProfileNamesFormErrorHandler extends BackendEditProfileFormErrorHandler<EditProfileNamesFormEntity> {
  public constructor(
    reduxProps: ReduxProps,
    completeEditProfile: (updatedUser: User) => void,
  ) {
    super(reduxProps, completeEditProfile, namesForm => ({
      first_name: namesForm.firstName,
      last_name: namesForm.lastName,
    }));
  }

  getMessages(): FormikErrors<EditProfileNamesFormEntity> {
    switch (this.getValidError().response.status) {
      default:
        // no specific field errors, just a general one will be displayed
        return {};
    }
  }
}
