import React from 'react';
import {Text, View} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import SuggestionItemProps from '../../../types/components/search/SuggestionItem';
import Divider from '../../Divider';
import {WIDTH} from '../../../types/Screen';

const UserSuggestionItem = (props: SuggestionItemProps) => {
  return (
    <View style={{marginBottom: 20}}>
      <View style={{flexDirection: 'row'}}>
        <Icon name={'user'} size={30} color="white" style={{marginLeft: 5}} />
        <Text style={{marginLeft: 10, color: 'white', fontSize: 20}}>
          {props.suggestion}
        </Text>
      </View>
      <Divider thickness={1} width={WIDTH - 13} top={10} />
    </View>
  );
};

export default UserSuggestionItem;
