import React from 'react';
import {Image, Text, View} from 'react-native';
import styles from '../styles/components/Loading';
import LoadingProps from '../types/components/Loading';

const Loading: React.FC<LoadingProps> = props => (
  <View testID="loading" style={[styles.container, props.styles?.container]}>
    <Image
      source={props.source ? props.source : require('../assets/loading.gif')}
      style={[styles.animation, props.styles?.animation]}
    />
    <Text style={[styles.description, props.styles?.description]}>
      {props.description}
    </Text>
  </View>
);

export default Loading;
