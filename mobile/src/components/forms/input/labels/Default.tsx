import React from 'react';
import InputLabelProps from '../../../../types/components/forms/input/labels/Default';
import {Text, View} from 'react-native';
import styles from '../../../../styles/components/forms/input/labels/Default';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const DefaultInputLabel: React.FC<InputLabelProps> = props => (
  <View style={[styles.container, props.styles?.container]}>
    {props.icon && (
      <Icon style={[styles.icon, props.styles?.icon]} name={props.icon} />
    )}
    <Text style={[styles.text, props.styles?.text]}>{props.content}</Text>
  </View>
);

export default DefaultInputLabel;
