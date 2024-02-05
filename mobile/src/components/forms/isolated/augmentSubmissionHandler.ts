import React from 'react';
import FormProps from '../../../types/components/forms/Form';
import augmentOnSubmit from './submissionAugmentation/augmentOnSubmit';
import augmentRequester from './submissionAugmentation/augmentRequester';

function augmentSubmissionHandler<T = any, F = any, S = any>(
  props: FormProps<any, T, F, S>,
  setSynchronizedValues: React.Dispatch<any>,
): FormProps<any, T, F, S>['submissionHandler'] {
  const notAugmentedSubmissionHandler = props.submissionHandler;
  if (notAugmentedSubmissionHandler.onSubmit) {
    return {
      onSubmit: augmentOnSubmit(
        notAugmentedSubmissionHandler.onSubmit,
        setSynchronizedValues,
      ),
    };
  }
  return {
    requester: augmentRequester(
      notAugmentedSubmissionHandler.requester as NonNullable<
        typeof notAugmentedSubmissionHandler.requester
      >,
      setSynchronizedValues,
    ),
  };
}

export default augmentSubmissionHandler;
