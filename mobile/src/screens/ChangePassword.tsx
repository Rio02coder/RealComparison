import React from 'react';
import appStyles from '../styles/screens/Themes';
import FormContainer from '../components/Container';
import Form from '../components/forms/Form';
import {InferType, object, ref, string} from 'yup';
import {SignUpValidationRules} from './SignUp';
import {ScreenProps} from '../types/Screen';
import {FormTypes} from '../types/components/forms/BaseForm';
import {ScreenNames} from '../types/ScreenNames';
import Input from '../components/forms/input/Input';
import {InputType} from '../types/components/forms/input/Input';
import Submit from '../components/forms/Submit';
import BackendChangePasswordFormErrorHandler from '../utilities/errors/backend/forms/ChangePassword';
import connector from '../redux/connector';

export const ChangePasswordValidationRules = {
  current_password: SignUpValidationRules.password,
  new_password: SignUpValidationRules.password,
  new_password_confirmation: string()
    .min(6, 'Password has at least 6 characters')
    .when('new_password', {
      is: (val: any) => !!(val && val.length > 0),
      then: string().oneOf([ref('new_password')], 'Passwords do not coincide'),
    })
    .required('Confirmation Required'),
};

export const ChangePasswordSchema = object(ChangePasswordValidationRules);

export interface ChangePasswordFormEntity
  extends InferType<typeof ChangePasswordSchema> {}

const ChangePassword: React.FC<
  ScreenProps<ScreenNames.ChangePassword>
> = props => {
  return (
    <FormContainer style={appStyles.mainAppTheme}>
      <Form
        style={appStyles.mainAppTheme}
        validationRules={ChangePasswordValidationRules}
        name={FormTypes.CHANGE_PASSWORD}
        initialValues={{
          current_password: '',
          new_password: '',
          new_password_confirmation: '',
        }}
        submissionHandler={{
          requester: {
            handler: new BackendChangePasswordFormErrorHandler(props),
          },
        }}>
        <Input
          name={'current_password'}
          inputType={InputType.TEXT}
          props={{
            placeholder: 'Current Password',
            keyboard: 'default',
            icon: 'lock',
            secure: true,
          }}
        />
        <Input
          name={'new_password'}
          inputType={InputType.TEXT}
          props={{
            icon: 'lock',
            placeholder: 'New Password',
            keyboard: 'default',
            secure: true,
          }}
        />
        <Input
          name={'new_password_confirmation'}
          inputType={InputType.TEXT}
          props={{
            icon: 'lock',
            placeholder: 'Password Confirmation',
            keyboard: 'default',
            secure: true,
          }}
        />
        <Submit testID="change_pass_submit" style={{marginTop: 35}} />
      </Form>
    </FormContainer>
  );
};

export default connector(ChangePassword);
