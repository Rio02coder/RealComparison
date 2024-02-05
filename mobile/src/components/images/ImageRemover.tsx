import React from 'react';
import ImageRemoverProps from '../../types/components/images/ImageRemover';
import {TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import styles from '../../styles/components/images/ImageRemover';

const ImageRemover: React.FC<ImageRemoverProps> = props => (
  <TouchableOpacity
    style={[styles.container, props.styles?.container]}
    onPress={() => props.remove()}>
    <Icon style={[styles.icon, props.styles?.icon]} name={'md-trash-bin'} />
  </TouchableOpacity>
);

export default ImageRemover;
