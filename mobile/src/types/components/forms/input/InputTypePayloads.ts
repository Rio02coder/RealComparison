import React from 'react';
import {KeyboardTypeOptions} from 'react-native';
import {InputType, Phone} from './Input';
import ModifiedDataPayload from '../../../search/filters/ModifiedDataPayload';

type InputTypePayloadsStructure = {
  [key in InputType]: any;
};

export default interface InputTypePayloads extends InputTypePayloadsStructure {
  [InputType.TEXT]: {
    placeholder?: string;
    label?: React.ReactNode;
    icon?: string;
    secure?: boolean | false;
    keyboard?: KeyboardTypeOptions;
  };
  [InputType.PHONE]: {
    phone: Phone;
    placeholder?: string;
  };
  [InputType.IMAGE_PICKER]: {
    confirmSubmission?: React.Dispatch<React.SetStateAction<boolean>>;
    /**
     * The required context for detecting when the state of the picked images in
     * the image slider needs to be restarted and also the confirmation of a restart.
     */
    reset?: {
      isNeeded: boolean;
      confirm: Function;
    };
  };
  [InputType.SWITCH]: {};
  [InputType.STRING_PICKER]: {
    data: ModifiedDataPayload<any>[];
    icon?: string;
  };
}
