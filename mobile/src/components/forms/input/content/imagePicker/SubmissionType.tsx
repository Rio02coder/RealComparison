import React from 'react';
import ImageSubmissionTypeProps from '../../../../../types/components/forms/input/content/imagePicker/SubmissionType';
import {Text, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import defaultStyles from '../../../../../styles/components/forms/input/content/imagePicker/SubmissionType';

const ImageSubmissionType: React.FC<ImageSubmissionTypeProps> = ({
  choose,
  icon,
  caption,
  styles,
}) => (
  <TouchableOpacity onPress={() => choose()}>
    <Icon style={[defaultStyles.icon, styles?.icon]} name={icon} />
    <Text style={[defaultStyles.caption, styles?.caption]}>{caption}</Text>
  </TouchableOpacity>
);

export default ImageSubmissionType;
