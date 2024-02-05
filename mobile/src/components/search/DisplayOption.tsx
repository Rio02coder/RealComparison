import React, {useContext} from 'react';
import {Text, TouchableOpacity} from 'react-native';
import {SearchScreenContext} from '../../screens/Core';
import SearchDisplayOptionStyles from '../../styles/components/search/SearchDisplayOption';
import SearchDisplayOptionProps from '../../types/components/search/DisplayOption';

const SearchDisplayOption: React.FC<SearchDisplayOptionProps> = props => {
  const {setScreen, currentScreen} = useContext(SearchScreenContext);
  return (
    <TouchableOpacity
      onPress={() => setScreen(props.name)}
      style={SearchDisplayOptionStyles.button}
      key={props.name}>
      <Text
        style={
          currentScreen === props.name
            ? SearchDisplayOptionStyles.enlargedText
            : SearchDisplayOptionStyles.text
        }>
        {props.name}
      </Text>
    </TouchableOpacity>
  );
};

export default SearchDisplayOption;
