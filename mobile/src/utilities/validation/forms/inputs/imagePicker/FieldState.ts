import {FormikProps} from 'formik';
import contextlessGetAllFieldProperties from './getAllFieldProperties';
import contextlessGetDisplayableProperties from './getDisplayableProperties';
import contextlessGetUpdateFieldPropertiesMethod from './getUpdateFieldPropertiesMethod';
import addPropertyPicture from './addPropertyPicture';
import contextlesRemovePropertyPicture from './removePropertyPicture';
import contextlesReset from './reset';

export default class ImagePickerFieldState {
  private readonly formikProps: FormikProps<any>;
  private readonly name: string;

  constructor(formikProps: FormikProps<any>, name: string) {
    this.formikProps = formikProps;
    this.name = name;
  }

  private getAllFieldProperties = () =>
    contextlessGetAllFieldProperties(this.formikProps, this.name);

  public hasChanges = () => this.hasNewImages() || this.hasDeletedImages();
  private hasNewImages = () => this.getAllFieldProperties().added.length > 0;
  private hasDeletedImages = () =>
    this.getAllFieldProperties().removed.length > 0;

  public getDisplayableProperties = () =>
    contextlessGetDisplayableProperties(this.getAllFieldProperties);

  private getUpdateFieldPropertiesMethod = () =>
    contextlessGetUpdateFieldPropertiesMethod(
      this.getAllFieldProperties(),
      this.formikProps,
      this.name,
    );

  public reset = () => contextlesReset(this.getUpdateFieldPropertiesMethod());

  public handlePictureAddition = (camera: boolean = false) =>
    addPropertyPicture(
      camera,
      this.getAllFieldProperties().added,
      this.getUpdateFieldPropertiesMethod(),
    );

  public removePropertyPicture = (pictureToRemove: number) =>
    contextlesRemovePropertyPicture(
      pictureToRemove,
      this.getDisplayableProperties,
      this.getAllFieldProperties,
      this.getUpdateFieldPropertiesMethod(),
    );
}
