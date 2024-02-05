import React, {useContext} from 'react';
import IsolatedForm from '../../../isolated/Isolated';
import {FormTypes} from '../../../../../types/components/forms/BaseForm';
import BackendEditProfilePhoneFormErrorHandler from '../../../../../utilities/errors/backend/forms/EditProfile/Phone';
import Input from '../../../input/Input';
import {InputType} from '../../../../../types/components/forms/input/Input';
import Submit from '../../../Submit';
import {InferType, object, string} from 'yup';
import {phoneRegexValidator} from '../../../../../utilities/validation/forms/Phone';
import {EditProfileContext} from '../../../../../screens/EditProfile';
import {View} from 'react-native';
import {getPhoneData} from '../../../../../utilities/Normalisers/Phone';

export const EditProfilePhoneValidationRules = {
  phone: string()
    .required('Phone Required')
    .matches(phoneRegexValidator, 'Phone must be valid'),
};

export const EditProfilePhoneSchema = object(EditProfilePhoneValidationRules);

export interface EditProfilePhoneFormEntity
  extends InferType<typeof EditProfilePhoneSchema> {}

const EditProfilePhoneForm: React.FC = () => {
  const props = useContext(EditProfileContext);
  const phoneData = props?.user?.phone
    ? getPhoneData(props.user.phone)
    : undefined;
  return (
    props && (
      <View testID="phone_form_view">
        <IsolatedForm
          validationRules={EditProfilePhoneValidationRules}
          name={FormTypes.EDIT_PROFILE}
          initialValues={{
            phone: props.user?.phone
              ? getPhoneData(props.user.phone).phone
              : props.user?.phone,
          }}
          submissionHandler={{
            requester: {
              handler: new BackendEditProfilePhoneFormErrorHandler(
                {...props},
                updatedUser => props.update(updatedUser),
              ),
            },
          }}>
          <Input
            name={'phone'}
            inputType={InputType.PHONE}
            props={{
              placeholder: 'Phone',
              phone: {
                phone: true,
                countryCode: phoneData ? phoneData.countryCode : undefined,
                phonePrefix: phoneData
                  ? phoneData.prefix.substring(1)
                  : undefined,
              },
            }}
          />
          <Submit />
        </IsolatedForm>
      </View>
    )
  );
};

export default EditProfilePhoneForm;
