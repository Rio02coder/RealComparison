import {
  FrontEndValidateOwner,
  BackEndValidateOwner,
} from '../../types/ValidateOwner';

export const ConvertToBackEndOwnerVerificationFormat = (
  args: FrontEndValidateOwner,
): BackEndValidateOwner => {
  return {
    verification_code: args.Code,
  };
};
