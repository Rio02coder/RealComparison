import React from 'react';
import {TouchableOpacity, Text} from 'react-native';
import ClearProps from '../../types/components/search/Clear';
import saveSearch from '../../utilities/storage/session/saveSearch';

const Clear = (props: ClearProps) => {
  return (
    <TouchableOpacity
      onPress={() => {
        props.clearSearches();
        saveSearch([]);
      }}>
      <Text
        style={{
          textDecorationLine: 'underline',
          textDecorationColor: 'white',
          color: 'white',
          fontSize: 15,
          marginRight: 7,
        }}>
        Clear
      </Text>
    </TouchableOpacity>
  );
};

export default Clear;
