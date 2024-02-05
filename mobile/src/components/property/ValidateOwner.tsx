import React, {useContext} from 'react';
import Form from '../forms/Form';
import {ObjectShape} from 'yup/lib/object';
import {InferType, number, object} from 'yup';
import Input from '../forms/input/Input';
import {InputType} from '../../types/components/forms/input/Input';
import Submit from '../forms/Submit';
import {FormTypes} from '../../types/components/forms/BaseForm';
import BackendValidateOwnerFormErrorHandler from '../../utilities/errors/backend/forms/ValidateOwner';
import BottomSheet from '../BottomSheet';
import {hp} from '../../types/Screen';
import {View, SafeAreaView, Text} from 'react-native';
import submitButtonStyles from '../../styles/defaults/buttons/Submit';
import {ValidateOwnerButtonProps} from '../../types/components/property/ValidateOwnership';
import appStyles from '../../styles/screens/Themes';
import {PropertyScreenContext} from '../../screens/Property';
import {addOwnedPropertyManager} from '../../utilities/property/OwnedPropertyManager';

export const ValidateOwnerRules: ObjectShape = {
  Code: number().required(),
};

export const ValidateOwnerSchema = object(ValidateOwnerRules);

export interface ValidateOwnerEntity
  extends InferType<typeof ValidateOwnerSchema> {}

const getButton = () => {
  return (
    <View style={[submitButtonStyles.container, {width: 180, height: 50}]}>
      <Text
        style={[submitButtonStyles.text, {fontWeight: 'bold', fontSize: 17}]}>
        Enter Code
      </Text>
    </View>
  );
};

const ValidateOwnerButton = (props: ValidateOwnerButtonProps) => {
  const {setProperty} = useContext(PropertyScreenContext);
  return (
    <BottomSheet elementToClickOn={getButton()} height={hp(40)}>
      <SafeAreaView style={{flex: 1}}>
        <Form
          style={{
            backgroundColor: appStyles.mainAppTheme.backgroundColor,
            paddingTop: 0,
          }}
          name={FormTypes.VALIDATE_OWNERSHIP}
          validationRules={ValidateOwnerRules}
          initialValues={{Code: ''}}
          submissionHandler={{
            requester: {
              handler: new BackendValidateOwnerFormErrorHandler(() =>
                addOwnedPropertyManager(
                  props.property,
                  props.props,
                  setProperty,
                ),
              ),
            },
          }}>
          <Input
            name={'Code'}
            inputType={InputType.TEXT}
            props={{icon: 'qrcode', placeholder: 'Enter your code here'}}
          />
          <Submit />
        </Form>
      </SafeAreaView>
    </BottomSheet>
  );
};

export default ValidateOwnerButton;
