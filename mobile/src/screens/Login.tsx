import React, {useEffect} from 'react';
import {InferType, object, string} from 'yup';
import {
  Keyboard,
  Platform,
  SafeAreaView,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import Link from '../components/Buttons/Link';
import connector from '../redux/connector';
import appStyles from '../styles/screens/Themes';
import {hp, ScreenProps, wp} from '../types/Screen';
import Form from '../components/forms/Form';
import Input from '../components/forms/input/Input';
import Submit from '../components/forms/Submit';
import {ScreenNames} from '../types/ScreenNames';
import {FormTypes} from '../types/components/forms/BaseForm';
import Title from '../components/Title';
import Divider from '../components/Divider';
import BackendLoginFormErrorHandler from '../utilities/errors/backend/forms/Login';
import completeLoginProcess from '../utilities/storage/session/completeLoginProcess';
import handleSession from '../utilities/storage/session/handleSession';
import OAuthProviders from '../components/OAuthentication/OAuthProviders';
import {InputType} from '../types/components/forms/input/Input';
import EmailReconfirmation from '../components/forms/prebuilt/screens/Login/EmailReconfirmation';
// import TouchableOpacity from 'react-native-gesture-handler/lib/typescript/components/touchables/TouchableOpacity';

export const LoginValidationRules = {
  email: string().required('Email Required').email('Invalid Email'),
  password: string()
    .min(6, 'Password has at least 6 characters')
    .required('Password Required'),
};

export const LoginSchema = object(LoginValidationRules);

export interface LoginFormEntity extends InferType<typeof LoginSchema> {}

const Login = (props: ScreenProps<ScreenNames.Login>) => {
  useEffect(() => {
    handleSession(props);
  }, []);

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <SafeAreaView style={appStyles.authenticationScreenTheme}>
        <Title title={'Sign In'} top={100} size={30} absolute={true} />
        <View testID="login_form_parent" style={{height: hp(62)}}>
          <Form
            style={{height: hp(40)}}
            validationRules={LoginValidationRules}
            name={FormTypes.LOGIN}
            initialValues={{email: '', password: ''}}
            submissionHandler={{
              requester: {
                handler: new BackendLoginFormErrorHandler(
                  /* istanbul ignore next */ loggedUser =>
                    completeLoginProcess(loggedUser, props),
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
            />
            <Input
              name={'password'}
              inputType={InputType.TEXT}
              props={{
                icon: 'lock',
                placeholder: 'Password',
                secure: true,
              }}
            />
            <Submit testID="submit_1" style={{marginTop: 68}} />
          </Form>
        </View>
        <Divider
          annotation={'Or'}
          width={wp(70)}
          thickness={1}
          top={Platform.OS === 'ios' ? 1 : 38}
        />
        <OAuthProviders
          completeLoginProcess={
            /* istanbul ignore next */ loggedUser =>
              completeLoginProcess(loggedUser, props)
          }
          containerStyle={{alignSelf: 'center', marginTop: 20}}
        />
        <EmailReconfirmation reduxProps={props} />
        <Link
          testID="login_button"
          title="Sign Up"
          navigation={props.navigation}
          nextScreen={ScreenNames.Signup}
          marginTop={90}
        />
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
};

export default connector(Login);
