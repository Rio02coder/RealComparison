import React from 'react';
import {TouchableOpacity} from 'react-native';
import GeneralLinkProps from '../../types/components/buttons/General';
import {ScreenNames} from '../../types/ScreenNames';

export default function GeneralLink<nextScreen extends ScreenNames>(
  props: GeneralLinkProps<nextScreen>,
) {
  return (
    <TouchableOpacity
      testID="Link"
      onPress={() =>
        props.navigation.navigate(props.nextScreen, props.payload)
      }>
      {props.children}
    </TouchableOpacity>
  );
}
