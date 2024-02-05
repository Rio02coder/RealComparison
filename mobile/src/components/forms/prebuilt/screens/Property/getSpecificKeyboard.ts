import {InputType} from '../../../../../types/components/forms/input/Input';
import {Property} from '../../../../../types/Property';
import mockProperty from '../../../../../../test_utils/MockProperty';

const getSpecificKeyboard = (
  field: keyof Property,
): InputType.TEXT | InputType.SWITCH | InputType.STRING_PICKER => {
  switch (typeof mockProperty[field]) {
    case 'boolean':
      return InputType.SWITCH;
    case 'string':
      return InputType.STRING_PICKER;
    default:
      return InputType.TEXT;
  }
};

export default getSpecificKeyboard;
