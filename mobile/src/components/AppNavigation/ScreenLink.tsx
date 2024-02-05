import React from 'react';
import GeneralLink from '../Buttons/GeneralLink';
import Icon from 'react-native-vector-icons/Ionicons';
import {View} from 'react-native';
import NavigationDrawerStyles from '../../styles/components/AppNavigation/NavigationDrawer';
import ScreenLinkProps from '../../types/components/AppNavigation/ScreenLink';
import {ScreenNames} from '../../types/ScreenNames';

export default function ScreenLink<nextScreen extends ScreenNames>(
  props: ScreenLinkProps<nextScreen>,
) {
  return (
    <View
      // testID="Link"
      // testID={props.nextScreen + 'Btn'}
      key={props.icon}
      style={NavigationDrawerStyles.screenLink}>
      <GeneralLink
        payload={props.payload}
        navigation={props.navigation}
        nextScreen={props.nextScreen}>
        <Icon
          name={props.icon}
          color={'white'}
          size={props.iconSize}
          style={props.style}
        />
      </GeneralLink>
    </View>
  );
}
