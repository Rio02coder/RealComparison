import React from 'react';
import {Text, View} from 'react-native';
import SuggestionItemProps from '../../../types/components/search/SuggestionItem';
import Icon from 'react-native-vector-icons/AntDesign';
import Divider from '../../Divider';
import {WIDTH} from '../../../types/Screen';

const Location = (props: SuggestionItemProps) => (
  <View style={{marginBottom: 20}}>
    <View style={{flexDirection: 'row'}}>
      <Icon
        name={props.history ? 'clockcircle' : 'enviroment'}
        size={props.history ? 23 : 30}
        color="white"
        style={{marginLeft: props.history ? 7 : 5}}
      />
      <Text style={{marginLeft: 10, color: 'white', fontSize: 20}}>
        {props.suggestion}
      </Text>
    </View>
    <Divider thickness={1} width={WIDTH - 13} top={10} />
  </View>
);

export default Location;
