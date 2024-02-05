import React, {useContext} from 'react';
import {FormTypes} from '../../../../../types/components/forms/BaseForm';
import BackendEditProfileEmailFormErrorHandler from '../../../../../utilities/errors/backend/forms/EditProfile/Email';
import Input from '../../../input/Input';
import {InputType} from '../../../../../types/components/forms/input/Input';
import IsolatedForm from '../../../isolated/Isolated';
import {InferType, object, string} from 'yup';
import Submit from '../../../Submit';
import {EditProfileContext} from '../../../../../screens/EditProfile';
import {View} from 'react-native';
import {StackNavigationProp} from '@react-navigation/stack';
import {NavigationStackTypes} from '../../../../../types/NavigationStackTypes';
import {ScreenNames} from '../../../../../types/ScreenNames';

export const EditProfileEmailValidationRules = {
  email: string().required('Email Required').email('Invalid Email'),
};

export const EditProfileEmailSchema = object(EditProfileEmailValidationRules);

export interface EditProfileEmailFormEntity
  extends InferType<typeof EditProfileEmailSchema> {}

const EditProfileEmailForm: React.FC = () => {
  const props = useContext(EditProfileContext);
  return (
    props && (
      <View testID="email_form_view">
        <IsolatedForm
          validationRules={EditProfileEmailValidationRules}
          name={FormTypes.EDIT_PROFILE}
          initialValues={{
            email: props.user.email,
          }}
          submissionHandler={{
            requester: {
              handler: new BackendEditProfileEmailFormErrorHandler(
                {...props},
                updatedUser => props.update(updatedUser),
                props.navigation as unknown as StackNavigationProp<
                  NavigationStackTypes,
                  ScreenNames
                >,
              ),
            },
          }}>
          <Input
            name={'email'}
            inputType={InputType.TEXT}
            props={{
              icon: 'email',
              placeholder: 'Email',
              keyboard: 'email-address',
            }}
            testID="emailInput"
          />
          <Submit />
        </IsolatedForm>
      </View>
    )
  );
};

export default EditProfileEmailForm;
