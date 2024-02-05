import React from 'react';
import {Text, TouchableOpacity} from 'react-native';
import LinkProps from '../../types/components/buttons/Link';
import stylesWithoutProps from '../../styles/defaults/buttons/Link';

const Link = (props: LinkProps) => {
  const styles = stylesWithoutProps(props);
  return (
    <TouchableOpacity
      testID={props.testID}
      onPress={() => props.navigation.navigate(props.nextScreen)}
      style={styles.container}>
      <Text style={styles.title}>{props.title}</Text>
    </TouchableOpacity>
  );
};

export default Link;
