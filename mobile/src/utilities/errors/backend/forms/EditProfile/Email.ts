/* istanbul ignore file */
import BackendEditProfileFormErrorHandler from './General';
import {EditProfileEmailFormEntity} from '../../../../../components/forms/prebuilt/screens/EditProfile/Email';
import {FormikErrors} from 'formik';
import ReduxProps from '../../../../../types/redux/props';
import User from '../../../../../types/User';
import {StackNavigationProp} from '@react-navigation/stack';
import {NavigationStackTypes} from '../../../../../types/NavigationStackTypes';
import {ScreenNames} from '../../../../../types/ScreenNames';
import ENDPOINTS from '../../../../../service/endpoints';

export default class BackendEditProfileEmailFormErrorHandler extends BackendEditProfileFormErrorHandler<EditProfileEmailFormEntity> {
  public constructor(
    reduxProps: ReduxProps,
    completeEditProfile: (updatedUser: User) => void,
    navigation: StackNavigationProp<NavigationStackTypes, ScreenNames>,
  ) {
    super(
      reduxProps,
      completeEditProfile,
      emailForm => ({
        email: emailForm.email,
      }),
      navigation,
      ENDPOINTS.USER.EDIT_EMAIL,
    );
  }

  getMessages(): FormikErrors<EditProfileEmailFormEntity> {
    switch (this.getValidError().response.status) {
      default:
        // no specific field errors, just a general one will be displayed
        return {};
    }
  }
}
