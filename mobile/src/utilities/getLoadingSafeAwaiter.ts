import React from 'react';

const getLoadingSafeAwaiter = (
  submissionAwaiter: void | Promise<any>,
  setLoading: React.Dispatch<React.SetStateAction<boolean>>,
): void | Promise<any> => {
  if (!(submissionAwaiter instanceof Promise)) {
    return;
  }
  return new Promise<any>(async (resolve, reject) => {
    setLoading(true);
    const submissionResponse = await submissionAwaiter;
    setLoading(false);
    return resolve(submissionResponse);
  });
};

export default getLoadingSafeAwaiter;
