import React from 'react';
import {Querier} from '../../../../types/components/forms/BaseForm';
import FormProps from '../../../../types/components/forms/Form';
import AugmentedRequester from './AugmentedRequester';

export default function augmentRequester<T = any, F = any, S = any>(
  requester: NonNullable<
    FormProps<any, T, F, S>['submissionHandler']['requester']
  >,
  setSynchronizedValues: React.Dispatch<any>,
) {
  const clonedRequester = {...requester} as Querier<T, any, F, S>;
  const baseRequester = clonedRequester.handler.getRequester();
  const augmentedRequester = new AugmentedRequester<T, F, S>(
    baseRequester,
    setSynchronizedValues,
  );
  clonedRequester.handler.setRequester(augmentedRequester);
  return clonedRequester;
}
