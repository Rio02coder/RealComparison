import React, {useState} from 'react';
import {Animated} from 'react-native';
import {PinchGestureHandler} from 'react-native-gesture-handler';
import ImageProps from '../../types/components/images/Image';
import stylesWithoutProps from '../../styles/components/property/Image';

const BASE_IMAGE_ANIMATED_VALUE = 1;

const AnimatedImageComponent = (props: ImageProps) => {
  const styles = stylesWithoutProps(props);
  const [scale, setScale] = useState(
    new Animated.Value(BASE_IMAGE_ANIMATED_VALUE),
  );
  return (
    <PinchGestureHandler
      onGestureEvent={Animated.event([{nativeEvent: {scale}}], {
        useNativeDriver: true,
      })}
      onHandlerStateChange={event => {
        if (event.nativeEvent.scale < BASE_IMAGE_ANIMATED_VALUE) {
          setScale(new Animated.Value(BASE_IMAGE_ANIMATED_VALUE));
        }
      }}>
      <Animated.Image
        source={props.source}
        style={[
          styles.image,
          props.style,
          {
            transform: [
              {
                scale,
              },
            ],
          },
        ]}
      />
    </PinchGestureHandler>
  );
};

export default AnimatedImageComponent;
