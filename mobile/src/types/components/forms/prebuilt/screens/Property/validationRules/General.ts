import {Property} from '../../../../../../Property';
import {Asserts, BaseSchema, boolean, number, string} from 'yup';
import mockProperty from '../../../../../../../../test_utils/MockProperty';

const getPropertyGeneralFieldValidationRules = (
  propertyKey: keyof Property,
): Asserts<any> => ({
  [propertyKey]: getYupValidationRulesFromPropertyKey(propertyKey),
});

const getYupValidationRulesFromPropertyKey = (
  propertyKey: keyof Property,
): BaseSchema => {
  const requiredFieldError = 'This field is required!';
  switch (typeof mockProperty[propertyKey]) {
    case 'boolean':
      return boolean().required(requiredFieldError);
    case 'number':
      return number().required(requiredFieldError);
    default:
      return string().required(requiredFieldError);
  }
};

export default getPropertyGeneralFieldValidationRules;
