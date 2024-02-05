import SearchQuit from './Quit';
import SearchInput from './Input';
import SearchSubmit from './Submit';
import {View} from 'react-native';
import React from 'react';
import {ScreenProps} from '../../types/Screen';
import {ScreenNames} from '../../types/ScreenNames';
import styles from '../../styles/components/search/Header';

const SearchHeader: React.FC<ScreenProps<ScreenNames.Search>> = props => (
  <View style={styles.container}>
    <SearchQuit {...props} />
    <SearchInput {...props} />
    {props.route.params.filter ? props.route.params.filter(props) : null}
    <SearchSubmit {...props} />
  </View>
);

export default SearchHeader;
