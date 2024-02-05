import React, {ReactElement, useRef} from 'react';
import BottomSheet from '../BottomSheet';
import {hp} from '../../types/Screen';
import FormProps from '../../types/components/forms/Form';
import Form from './Form';
import InputProps from '../../types/components/forms/input/Input';
import {FormikProps} from 'formik';
import {Querier} from '../../types/components/forms/BaseForm';

export default function IsolatedForm<T = any, F = any, S = any>(
  props: FormProps<any, T, F, S>,
) {
  const previewFormRef = useRef<FormikProps<any>>(null);

  const refresh = (updatedValues: any) => {
    const formFieldIds = getFormFieldIds();
    for (let i = 0; i < formFieldIds.length; i++) {
      const formFieldId = formFieldIds[i];
      refreshField(formFieldId, updatedValues[formFieldId]);
    }
  };

  const refreshField = (fieldToUpdate: string, newValue: any) =>
    previewFormRef.current?.handleChange(fieldToUpdate)(newValue);

  const getFormFieldIds = () => {
    const inputChildren = filterInputChildren();
    const fieldIds = [] as string[];
    for (let i = 0; i < inputChildren.length; i++) {
      fieldIds.push(inputChildren[i].props.name);
    }
    return fieldIds;
  };

  const filterInputChildren = () => {
    const children = getChildren();
    const inputs = [] as ReactElement<InputProps<any>>[];
    for (let i = 0; i < children.length; i++) {
      const child = children[i];
      if (child.props?.name) {
        inputs.push(child);
      }
    }
    return inputs;
  };

  const getChildren = (): ReactElement[] => {
    const {children} = props;
    if (children instanceof Array) {
      return children;
    }
    return [children];
  };

  const augmentSubmissionHandler = (
    notAugmentedSubmissionHandler: FormProps<any, T, F, S>['submissionHandler'],
  ): FormProps<any, T, F, S>['submissionHandler'] => {
    if (notAugmentedSubmissionHandler.onSubmit) {
      return {
        onSubmit: augmentOnSubmit(notAugmentedSubmissionHandler.onSubmit),
      };
    }
    return {
      requester: augmentRequester(
        notAugmentedSubmissionHandler.requester as NonNullable<
          typeof notAugmentedSubmissionHandler.requester
        >,
      ),
    };
  };

  const augmentRequester = (
    requester: NonNullable<
      FormProps<any, T, F, S>['submissionHandler']['requester']
    >,
  ) => {
    const clonedRequester = {...requester} as Querier<T, any, F, S>;
    clonedRequester.handler.getFormProcessor =
      passedSetErrors => (form, stringified) =>
        new Promise<F | null>((resolve, reject) => {
          requester.handler
            .getFormProcessor(passedSetErrors)(form, stringified)
            .then(processedResponse => {
              refresh(form);
              resolve(processedResponse);
            })
            .catch(err => reject(err));
        });
    return clonedRequester;
  };

  const augmentOnSubmit =
    (
      onSubmit: NonNullable<
        FormProps<any, T, F, S>['submissionHandler']['onSubmit']
      >,
    ): NonNullable<FormProps<any, T, F, S>['submissionHandler']['onSubmit']> =>
    (values, formikHelpers) => {
      const possiblyPendingSubmission = onSubmit(values, formikHelpers);
      if (possiblyPendingSubmission instanceof Promise)
        return new Promise<any>((resolve, reject) =>
          possiblyPendingSubmission
            .then(processedResponse => {
              refresh(values);
              resolve(processedResponse);
            })
            .catch(err => reject(err)),
        );
      refresh(values);
    };

  return (
    <BottomSheet
      // onOpen={() => activate()}
      // onClose={() => deactivate()}
      elementToClickOn={
        <Form<T, F, S>
          ref={previewFormRef}
          {...props}
          overridingAction={() => console.log('ok')}
        />
      }
      height={hp(90)}>
      <Form<T, F, S>
        {...props}
        submissionHandler={augmentSubmissionHandler(props.submissionHandler)}
      />
    </BottomSheet>
  );
}
