import InputProps, {InputType} from '../../Input';
import InputTypePayloads from '../../InputTypePayloads';

export type SupportedInputs =
  | InputType.TEXT
  | InputType.SWITCH
  | InputType.STRING_PICKER;

type PropertyAdderInputProps<inputType extends SupportedInputs> =
  BasePropertyAdderInputPropsConstruct<inputType>['constructProps'] & {
    icon: string;
    description: string;
    inputType: inputType;
    name: string;
  };

// type BasePropertyAdderInputProps<inputType extends SupportedInputs> =
//   BasePropertyAdderInputPropsConstruct<inputType>['constructProps'];

interface BasePropertyAdderInputPropsConstruct<
  inputType extends SupportedInputs,
> {
  constructProps: inputType extends InputType.TEXT
    ? TextInputTypeProps
    : inputType extends InputType.SWITCH
    ? SwitchInputTypeProps
    : StringPickerInputTypeProps;
}

interface TextInputTypeProps extends Partial<InputProps<InputType.TEXT>> {}
interface SwitchInputTypeProps extends Partial<InputProps<InputType.SWITCH>> {}
interface StringPickerInputTypeProps
  extends Partial<InputProps<InputType.STRING_PICKER>> {
  props: {
    data: InputTypePayloads[InputType.STRING_PICKER]['data'];
  };
}

export type PropertyAdderSpecificInputProps<inputType extends SupportedInputs> =
  Partial<PropertyAdderInputProps<inputType>>;

export default PropertyAdderInputProps;
