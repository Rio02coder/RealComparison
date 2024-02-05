import {
  AdditionalFieldDataEnhancementContext,
  AdditionalFieldsData,
  FormFieldEnhancementMethod,
} from '../../../types/components/forms/FormContext';

const addPhonePrefixes: FormFieldEnhancementMethod = ({
  fieldToEnhance,
  enhancementContext,
}) => {
  for (let i = 0; i < enhancementContext.length; i++) {
    const possiblePrefixContext = enhancementContext[i];
    if (possiblePrefixContext.details.isPrefix) {
      return `+${possiblePrefixContext.data}${fieldToEnhance}`;
    }
  }
  return fieldToEnhance;
};

const applyFormFieldEnhancements = (
  toBeEnhancedValue: string,
  enhancements: Array<FormFieldEnhancementMethod>,
  enhancementContext?: AdditionalFieldDataEnhancementContext,
): string => {
  if (!enhancementContext) {
    return toBeEnhancedValue;
  }
  for (let i = 0; i < enhancements.length; i++) {
    toBeEnhancedValue = enhancements[i]({
      fieldToEnhance: toBeEnhancedValue,
      enhancementContext,
    });
  }
  return toBeEnhancedValue;
};

function enhanceFormValues<D>(
  notEnhancedValues: D,
  additionalData: AdditionalFieldsData<D>,
  enhancements: Array<FormFieldEnhancementMethod> = [addPhonePrefixes],
): D {
  let enhancedFormValues = notEnhancedValues;
  for (const key in notEnhancedValues) {
    let notEnhancedValue = notEnhancedValues[key] as unknown as string;
    const enhancementContext = additionalData.get(key);
    enhancedFormValues[key] = applyFormFieldEnhancements(
      notEnhancedValue,
      enhancements,
      enhancementContext,
    ) as unknown as D[Extract<keyof D, string>];
  }
  return enhancedFormValues;
}

export default enhanceFormValues;
