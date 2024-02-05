import React, {useEffect, useRef, useState} from 'react';
import BottomSheet from '../../BottomSheet';
import {hp} from '../../../types/Screen';
import Form from '../Form';
import {FormikProps} from 'formik';
import augmentSubmissionHandler from './augmentSubmissionHandler';
import styles from '../../../styles/components/forms/isolated/Isolated';
import IsolatedFormProps from '../../../types/components/forms/isolated/Isolated';

export default function IsolatedForm<T = any, F = any, S = any>(
  props: IsolatedFormProps<T, F, S>,
) {
  const previewFormRef = useRef<FormikProps<any>>(null);
  const [openedEditor, setOpenedEditor] = useState<boolean>(false);

  const [synchronizedValues, setSynchronizedValues] = useState(
    props.initialValues,
  );

  const keepValuesInSync = () => {
    const currentPreviewFormRef = previewFormRef.current;
    if (currentPreviewFormRef === null) {
      return;
    }
    currentPreviewFormRef.setValues(synchronizedValues);
  };

  useEffect(keepValuesInSync, [synchronizedValues]);

  const getActivatedAction = (): Function =>
    props.deactivated ? () => {} : () => setOpenedEditor(true);

  return (
    <BottomSheet
      onClose={() => setOpenedEditor(false)}
      isOpened={openedEditor}
      elementToClickOn={
        <Form<T, F, S>
          ref={previewFormRef}
          {...props}
          hasNoError
          style={[styles.defaultPreviewFormContainer, props.style]}
          overridingAction={getActivatedAction()}
        />
      }
      height={hp(90)}>
      <Form<T, F, S>
        {...props}
        style={[styles.defaultEditorFormContainer, props.editorStyle]}
        initialValues={synchronizedValues}
        submissionHandler={augmentSubmissionHandler(
          props,
          setSynchronizedValues,
        )}
      />
    </BottomSheet>
  );
}
