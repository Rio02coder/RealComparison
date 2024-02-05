import React from 'react';
import {InferType, object, ref, string} from 'yup';
import {ScreenNames} from '../types/ScreenNames';
import {hp, ScreenProps} from '../types/Screen';
import Title from '../components/Title';
import Form from '../components/forms/Form';
import {FormTypes} from '../types/components/forms/BaseForm';
import Input from '../components/forms/input/Input';
import Submit from '../components/forms/Submit';
import {phoneRegexValidator} from '../utilities/validation/forms/Phone';
import connector from '../redux/connector';
import BackendSignUpFormErrorHandler from '../utilities/errors/backend/forms/SignUp';
import FormContainer from '../components/Container';
import {InputType} from '../types/components/forms/input/Input';

export const SignUpValidationRules = {
  email: string().required('Email Required').email('Invalid Email'),
  password: string()
    .min(6, 'Password has at least 6 characters')
    .required('Password Required'),
  firstName: string().required('First Name Required'),
  lastName: string().required('Last Name Required'),
  phone: string()
    .required('Phone Required')
    .matches(phoneRegexValidator, 'Phone must be valid'),
  passwordConfirm: string()
    .min(6, 'Password has at least 6 characters')
    .when('password', {
      is: (val: any) => !!(val && val.length > 0),
      then: string().oneOf([ref('password')], 'Passwords do not coincide'),
    })
    .required('Confirmation Required'),
};

export const SignUpSchema = object(SignUpValidationRules);

export interface SignUpFormEntity extends InferType<typeof SignUpSchema> {}

const SignUp: React.FC<ScreenProps<ScreenNames.Signup>> = props => (
  <FormContainer>
    <Title
      testID="SignUpHeader"
      title={'Sign Up'}
      top={70}
      size={30}
      absolute={true}
    />
    <Form
      style={{height: hp(85)}}
      validationRules={SignUpValidationRules}
      name={FormTypes.SIGNUP}
      initialValues={{
        email: '',
        password: '',
        firstName: '',
        lastName: '',
        passwordConfirm: '',
        phone: '',
      }}
      submissionHandler={{
        requester: {
          handler: new BackendSignUpFormErrorHandler(
            /* istanbul ignore next */ () =>
              props.navigation.navigate(ScreenNames.Login),
          ),
        },
      }}>
      <Input
        name={'firstName'}
        inputType={InputType.TEXT}
        props={{
          icon: 'card-account-details',
          placeholder: 'First Name',
          keyboard: 'default',
        }}
      />
      <Input
        name={'lastName'}
        inputType={InputType.TEXT}
        props={{
          icon: 'card-account-details',
          placeholder: 'Last Name',
          keyboard: 'default',
        }}
      />
      <Input
        name={'email'}
        inputType={InputType.TEXT}
        props={{
          icon: 'email',
          placeholder: 'Email',
          keyboard: 'email-address',
        }}
      />
      <Input
        name={'phone'}
        inputType={InputType.PHONE}
        props={{
          placeholder: 'Phone',
          phone: {
            phone: true,
          },
        }}
      />
      <Input
        name={'password'}
        inputType={InputType.TEXT}
        props={{
          placeholder: 'Password',
          keyboard: 'default',
          icon: 'lock',
          secure: true,
        }}
      />
      <Input
        name={'passwordConfirm'}
        inputType={InputType.TEXT}
        props={{
          icon: 'lock',
          placeholder: 'Confirm Password',
          keyboard: 'default',
          secure: true,
        }}
      />
      <Submit testID="submit_signup" style={{marginTop: 35}} />
    </Form>
  </FormContainer>
);

export default connector(SignUp);
