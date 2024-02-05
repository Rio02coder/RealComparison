import React from 'react';
import BottomSheet from '../../../../BottomSheet';
import {Text} from 'react-native';
import {hp} from '../../../../../types/Screen';
import Form from '../../../Form';
import {FormTypes} from '../../../../../types/components/forms/BaseForm';
import Input from '../../../input/Input';
import {InputType} from '../../../../../types/components/forms/input/Input';
import Submit from '../../../Submit';
import {InferType, object, string} from 'yup';
import BackendEmailReconfirmationFormErrorHandler from '../../../../../utilities/errors/backend/forms/Login/EmailReconfirmation';
import ReduxProps from '../../../../../types/redux/props';
import FormContainer from '../../../../Container';
import styles from '../../../../../styles/components/forms/prebuilt/screens/Login/EmailReconfirmation';

export const EmailReconfirmationValidationRules = {
  email: string().required('Email Required').email('Invalid Email'),
};

export const EmailReconfirmationSchema = object(
  EmailReconfirmationValidationRules,
);

export interface EmailReconfirmationEntity
  extends InferType<typeof EmailReconfirmationSchema> {}

const EmailReconfirmation: React.FC<{reduxProps: ReduxProps}> = ({
  reduxProps,
}) => (
  <BottomSheet elementToClickOn={<Presentation />} height={hp(40)}>
    <FormContainer style={{justifyContent: 'center'}}>
      <RequestForm reduxProps={reduxProps} />
    </FormContainer>
  </BottomSheet>
);

const Presentation: React.FC = () => (
  <Text style={styles.presentation}>(resend email verification link)</Text>
);

const RequestForm: React.FC<{reduxProps: ReduxProps}> = ({reduxProps}) => (
  <Form
    style={{marginTop: undefined}}
    validationRules={EmailReconfirmationValidationRules}
    name={FormTypes.RESEND_EMAIL}
    initialValues={{email: ''}}
    submissionHandler={{
      requester: {
        handler: new BackendEmailReconfirmationFormErrorHandler(reduxProps),
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
    <Submit />
  </Form>
);

export default EmailReconfirmation;
