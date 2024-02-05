import React, {useContext} from 'react';
import {View, SafeAreaView} from 'react-native';
import SearchContainerProps from '../../types/components/search/Container';
import {searchOptions} from '../../types/components/search/SearchScreens';
import SearchDisplayOption from './DisplayOption';
import StylesWithoutProps from '../../styles/components/search/SearchBar';
import SearchBar from './Bar';
import {SearchScreenContext} from '../../screens/Core';

const SearchContainer: React.FC<SearchContainerProps> = props => {
  const contextProps = useContext(SearchScreenContext);
  const styles = StylesWithoutProps(contextProps);
  return (
    <SafeAreaView style={styles.mainContainer}>
      <View style={styles.group}>
        <SearchBar />
        <View style={styles.buttonContainer}>
          {searchOptions.map(searchOptionName => (
            <SearchDisplayOption
              name={searchOptionName}
              key={searchOptionName}
            />
          ))}
        </View>
      </View>
    </SafeAreaView>
  );
};

export default SearchContainer;
