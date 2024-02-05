import React from 'react';
import {Text, View} from 'react-native';
import DividerProps from '../types/components/Divider';
import stylesWithoutProps from '../styles/components/Divider';

const Divider: React.FC<DividerProps> = props => {
  const styles = stylesWithoutProps(props);
  return (
    <View style={styles.container}>
      <Text style={styles.annotation}>{props.annotation}</Text>
    </View>
  );
};

export default Divider;
