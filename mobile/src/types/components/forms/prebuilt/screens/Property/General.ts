import {Property} from '../../../../../Property';
import BackendPropertyFormErrorHandler from '../../../../../../utilities/errors/backend/forms/Property/General';
import {FormTypes} from '../../../BaseForm';
import {StyleProp} from 'react-native';
import {InputType} from '../../../input/Input';
import InputTypePayloads from '../../../input/InputTypePayloads';
import {TextStyle} from 'react-native';

export default interface PropertyGeneralFormProps {
  style?: StyleProp<TextStyle>;
  field: keyof Property;
  inputProps: InputTypePayloads[InputType];
  getMessagesImplementation: BackendPropertyFormErrorHandler<any>['getMessagesImplementation'];
  icon: string;
  description: string;
  formType: FormTypes;
}
