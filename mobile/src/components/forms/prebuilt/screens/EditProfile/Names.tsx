import React, {useContext} from 'react';
import {FormTypes} from '../../../../../types/components/forms/BaseForm';
import BackendEditProfileNamesFormErrorHandler from '../../../../../utilities/errors/backend/forms/EditProfile/Names';
import Input from '../../../input/Input';
import {InputType} from '../../../../../types/components/forms/input/Input';
import Submit from '../../../Submit';
import IsolatedForm from '../../../isolated/Isolated';
import {InferType, object, string} from 'yup';
import {EditProfileContext} from '../../../../../screens/EditProfile';
import {View} from 'react-native';

export const EditProfileNamesValidationRules = {
  firstName: string().required('First Name Required'),
  lastName: string().required('Last Name Required'),
};

export const EditProfileNamesSchema = object(EditProfileNamesValidationRules);

export interface EditProfileNamesFormEntity
  extends InferType<typeof EditProfileNamesSchema> {}

const EditProfileNamesForm: React.FC = () => {
  const props = useContext(EditProfileContext);
  return (
    props && (
      <View testID="name_form_view">
        <IsolatedForm
          validationRules={EditProfileNamesValidationRules}
          name={FormTypes.EDIT_PROFILE}
          initialValues={{
            firstName: props.user?.firstName,
            lastName: props.user?.lastName,
          }}
          submissionHandler={{
            requester: {
              handler: new BackendEditProfileNamesFormErrorHandler(
                {...props},
                updatedUser => props.update(updatedUser),
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
          <Submit />
        </IsolatedForm>
      </View>
    )
  );
};

export default EditProfileNamesForm;
