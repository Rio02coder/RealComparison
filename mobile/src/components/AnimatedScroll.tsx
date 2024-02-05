import React from 'react';
import {Animated} from 'react-native';
import AnimatedScrollProps from '../types/components/AnimatedScroll';

const AnimatedScrollView = (props: AnimatedScrollProps) => {
  return (
    <Animated.ScrollView
      keyboardShouldPersistTaps="handled"
      onScroll={Animated.event(
        [
          {
            nativeEvent: {contentOffset: {y: props.scrollY}},
          },
        ],
        {useNativeDriver: true},
      )}
      scrollEventThrottle={16}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{flexGrow: 1}}>
      {props.children}
    </Animated.ScrollView>
  );
};

export default AnimatedScrollView;
