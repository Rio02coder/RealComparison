import React from 'react';
import {View, Text} from 'react-native';
import stylesWithoutProps from '../styles/components/Title';
import TitleProps from '../types/components/Title';

const Title: React.FC<TitleProps> = props => {
  const styles = stylesWithoutProps(props);
  return (
    <View testID={props.testID} style={styles.container}>
      <Text style={styles.title}>{props.title}</Text>
    </View>
  );
};

export default Title;
