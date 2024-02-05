import Icon from 'react-native-vector-icons/Entypo';
import {TouchableOpacity} from 'react-native';
import React from 'react';
import {ScreenProps} from '../../types/Screen';
import {ScreenNames} from '../../types/ScreenNames';

const SearchQuit: React.FC<ScreenProps<ScreenNames.Search>> = ({
  navigation: {goBack},
}) => (
  <TouchableOpacity onPress={goBack}>
    <Icon
      name="chevron-thin-left"
      color={'white'}
      size={25}
      style={{marginTop: 12, marginLeft: 5}}
    />
  </TouchableOpacity>
);

export default SearchQuit;
