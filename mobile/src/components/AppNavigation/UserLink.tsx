import React from 'react';
import GeneralLink from '../Buttons/GeneralLink';
import Icon from 'react-native-vector-icons/FontAwesome';
import {Text, View} from 'react-native';
import UserLinkProps from '../../types/components/AppNavigation/UserLink';
import {ScreenNames} from '../../types/ScreenNames';
import Divider from '../Divider';
import {WIDTH} from '../../types/Screen';

export default function UserLink<nextScreen extends ScreenNames>(
  props: UserLinkProps<nextScreen>,
) {
  return (
    <GeneralLink
      payload={props.payload}
      navigation={props.navigation}
      nextScreen={props.nextScreen}>
      <View style={{marginBottom: 15}}>
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <View style={{flexDirection: 'row'}}>
            <Icon
              name={props.icon}
              color={'white'}
              size={props.iconSize}
              style={props.style}
            />
            <Text
              style={[
                {color: 'white', fontSize: 20, marginLeft: 5},
                props.textStyle,
              ]}>
              {props.text}
            </Text>
          </View>
          <Icon
            name="angle-right"
            color={'white'}
            size={35}
            style={{marginTop: -3.5}}
          />
        </View>
        <Divider thickness={1} width={'100%'} top={3} />
      </View>
    </GeneralLink>
  );
}
