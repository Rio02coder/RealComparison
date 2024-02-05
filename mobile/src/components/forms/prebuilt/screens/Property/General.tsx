import React, {useContext} from 'react';
import Input from '../../../input/Input';
import IsolatedForm from '../../../isolated/Isolated';
import {InferType, object} from 'yup';
import Submit from '../../../Submit';
import {DescriptionContext} from '../../../../property/Description';
import {PropertyScreenContext} from '../../../../../screens/Property';
import ReduxProps from '../../../../../types/redux/props';
import DefaultInputLabel from '../../../input/labels/Default';
import PropertyGeneralFormProps from '../../../../../types/components/forms/prebuilt/screens/Property/General';
import getPropertyGeneralFieldValidationRules from '../../../../../types/components/forms/prebuilt/screens/Property/validationRules/General';
import BackendPropertyFormErrorHandler from '../../../../../utilities/errors/backend/forms/Property/General';
import getSpecificKeyboard from './getSpecificKeyboard';
import {InputType} from '../../../../../types/components/forms/input/Input';
import {Platform} from 'react-native';
import readEntityField from '../../../../../utilities/errors/backend/forms/readEntityField';
import {getPropertyTypeObject} from '../../../../../utilities/property/getPropertyTypeObject';
import getModifiedData from '../../../../../utilities/search/filters/getModifiedData';
import {stringFilterData} from '../../../../../utilities/search/filters/FilterData';
import StringKeys from '../../../../../types/search/filters/keys/StringKeys';

const PropertyGeneralForm: React.FC<PropertyGeneralFormProps> = ({
  field,
  getMessagesImplementation,
  inputProps,
  style,
  icon,
  description,
  formType,
}) => {
  const PropertyGeneralFieldValidationRules =
    getPropertyGeneralFieldValidationRules(field);
  const PropertyGeneralFieldSchema = object(
    PropertyGeneralFieldValidationRules,
  );

  interface PropertyGeneralFieldFormEntity
    extends InferType<typeof PropertyGeneralFieldSchema> {}

  const {setProperty, reduxProps} = useContext(PropertyScreenContext);
  const props = useContext(DescriptionContext);
  const inputType = getSpecificKeyboard(field);
  const inputTypeProps =
    inputType === InputType.SWITCH
      ? {}
      : inputType === InputType.STRING_PICKER
      ? inputProps
      : {keyboard: 'numeric'};
  return (
    props && (
      <IsolatedForm
        deactivated={!props.isUserOwnerOfThisProperty}
        style={{width: '100%'}}
        validationRules={PropertyGeneralFieldValidationRules}
        name={formType}
        initialValues={{
          [field]:
            inputType === InputType.STRING_PICKER
              ? getPropertyTypeObject<string>(
                  readEntityField(props.property, field),
                  getModifiedData(
                    stringFilterData.get(field as keyof StringKeys) as string[],
                  ),
                )?.value
              : readEntityField(props.property, field),
        }}
        submissionHandler={{
          requester: {
            handler:
              new BackendPropertyFormErrorHandler<PropertyGeneralFieldFormEntity>(
                props.property.id,
                reduxProps as ReduxProps,
                setProperty,
                getMessagesImplementation,
              ),
          },
        }}>
        <Input
          styles={{
            container: {width: '95%'},
            text: [
              {width: 100, padding: Platform.OS === 'android' ? 0 : 2},
              style,
            ],
          }}
          label={
            <DefaultInputLabel
              styles={{text: {color: 'white'}, icon: {color: 'white'}}}
              icon={icon}
              content={description}
            />
          }
          name={field}
          inputType={inputType}
          props={inputTypeProps}
        />
        <Submit />
      </IsolatedForm>
    )
  );
};

export default PropertyGeneralForm;
