import React from 'react';
import ImageSubmissionTypeChooserProps from '../../../../../types/components/forms/input/content/imagePicker/SubmissionTypeChooser';
import BottomSheet from '../../../../BottomSheet';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {hp} from '../../../../../types/Screen';
import ImageSubmissionType from './SubmissionType';
import {View} from 'react-native';
import defaultStyles from '../../../../../styles/components/forms/input/content/imagePicker/SubmissionTypeChooser';

const ImageSubmissionTypeChooser: React.FC<ImageSubmissionTypeChooserProps> = ({
  chooseCamera,
  chooseGallery,
  styles,
}) => (
  <View testID="addImagesButton" style={defaultStyles.container}>
    <BottomSheet
      elementToClickOn={
        <Icon style={[defaultStyles.icon, styles?.icon]} name={'image-plus'} />
      }
      height={hp(10)}>
      <View style={defaultStyles.footer}>
        <ImageSubmissionType
          styles={styles}
          caption={'Gallery'}
          choose={chooseGallery}
          icon={'images'}
        />
        <ImageSubmissionType
          styles={styles}
          caption={'Camera'}
          choose={chooseCamera}
          icon={'camera'}
        />
      </View>
    </BottomSheet>
  </View>
);

export default ImageSubmissionTypeChooser;
