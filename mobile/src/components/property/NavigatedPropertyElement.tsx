import React from 'react';
import {View} from 'react-native';
import NavigatedPropertyProps from '../../types/components/property/NavigatedPropertyProps';
import ScreenNavigator from '../Buttons/GeneralLink';
import PropertyElement from './PropertyElement';

/**
 * This File renders the component which uses a navigated version of the property component.
 * The element can be clicked to reach the desired screen.
 */

const NavigatedPropertyElement = (props: NavigatedPropertyProps) => {
  return (
    <View testID="property_element">
      <ScreenNavigator
        navigation={props.navigation}
        nextScreen={props.nextScreen}
        payload={{property: props.property}}>
        <PropertyElement
          reduxProps={props.reduxProps}
          property={props.property}
          containerHeight={props.containerHeight}
          containerWidth={props.containerWidth}
          imageHeight={props.imageHeight}
          imageWidth={props.imageWidth}
        />
      </ScreenNavigator>
    </View>
  );
};

export default NavigatedPropertyElement;
