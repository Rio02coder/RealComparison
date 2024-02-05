import React from 'react';
import {Image} from 'react-native';
import ImageProps from '../../types/components/images/Image';
import stylesWithoutProps from '../../styles/components/property/Image';

const ImageComponent = (props: ImageProps) => {
  const styles = stylesWithoutProps(props);
  return (
    <Image
      testID={props.testID}
      source={props.source}
      style={[styles.image, props.style]}
    />
  );
};

export default ImageComponent;
