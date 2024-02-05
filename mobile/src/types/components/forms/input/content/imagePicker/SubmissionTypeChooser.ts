import ImageSubmissionTypeProps from './SubmissionType';

export default interface ImageSubmissionTypeChooserProps {
  chooseCamera: Function;
  chooseGallery: Function;
  styles?: ImageSubmissionTypeProps['styles'];
};
