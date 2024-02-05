import FormProps from '../../../../types/components/forms/Form';

export default function augmentOnSubmit<T = any, F = any, S = any>(
  onSubmit: NonNullable<
    FormProps<any, T, F, S>['submissionHandler']['onSubmit']
  >,
  setSynchronizedValues: React.Dispatch<any>,
): NonNullable<FormProps<any, T, F, S>['submissionHandler']['onSubmit']> {
  return (values, formikHelpers) => {
    const possiblyPendingSubmission = onSubmit(values, formikHelpers);
    if (possiblyPendingSubmission instanceof Promise)
      return new Promise<any>((resolve, reject) =>
        possiblyPendingSubmission
          .then(processedResponse => {
            setSynchronizedValues(() => values);
            resolve(processedResponse);
          })
          .catch(err => reject(err)),
      );
    setSynchronizedValues(() => values);
  };
}
