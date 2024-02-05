import {TextInput} from 'react-native-gesture-handler';
import React from 'react';
import {ScreenProps} from '../../types/Screen';
import {ScreenNames} from '../../types/ScreenNames';
import styles from '../../styles/components/search/Input';

const SearchInput: React.FC<ScreenProps<ScreenNames.Search>> = ({
  route: {
    params: {searchTag, searchAction},
  },
  search,
}) => (
  <TextInput
    style={styles.container}
    onChangeText={searchAction}
    value={search.get(searchTag) as string}
  />
);

export default SearchInput;
