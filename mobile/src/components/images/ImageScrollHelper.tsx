import React from 'react';
import {TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import styles from '../../styles/components/images/ImageScrollHelper';
import ImageScrollHelperProps from '../../types/components/images/ImageScrollHelper';

const ImageScrollHelper: React.FC<ImageScrollHelperProps> = props =>
  props.move ? (
    <TouchableOpacity
      onPress={() => (props.move as Function)()}
      style={[styles.container, props.styles?.container]}>
      <Icon style={[styles.icon, props.styles?.icon]} name={props.icon} />
    </TouchableOpacity>
  ) : null;

export default ImageScrollHelper;
