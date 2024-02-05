import React, {useEffect, useState} from 'react';
import getRecentSearches from '../../utilities/storage/session/getRecentSearches';
import {Text, View} from 'react-native';
import AutoCompleter from '../AutoCompleter';
import {ScreenProps} from '../../types/Screen';
import {ScreenNames} from '../../types/ScreenNames';
import {defaultPressHandler} from '../../screens/Search';
import styles from '../../styles/components/search/RecentSearches';
import Clear from './Clear';

const RecentSearches: React.FC<ScreenProps<ScreenNames.Search>> = ({
  route: {
    params: {autoCompleter, suggestionItem, history, searchAction},
  },
}) => {
  const [searchHistory, setSearchHistory] = useState<string[]>([]);
  useEffect(() => {
    getRecentSearches().then(setSearchHistory);
  }, []);
  const isHistoryAvailable =
    !!autoCompleter && searchHistory.length > 0 && history;
  return isHistoryAvailable ? (
    <View style={styles.container}>
      <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
        <Text style={styles.title}>Recent Searches</Text>
        <Clear clearSearches={() => setSearchHistory([])} />
      </View>
      <History
        updateSearch={searchAction}
        searchHistory={searchHistory}
        suggestionItem={suggestionItem}
      />
    </View>
  ) : null;
};

const History: React.FC<{
  updateSearch: ScreenProps<ScreenNames.Search>['route']['params']['searchAction'];
  suggestionItem: ScreenProps<ScreenNames.Search>['route']['params']['suggestionItem'];
  searchHistory: string[];
}> = ({updateSearch, searchHistory, suggestionItem}) => (
  <AutoCompleter<string>
    data={searchHistory}
    stringify={element => element}
    press={element =>
      defaultPressHandler(
        element,
        updateSearch,
        pressedElement => pressedElement,
      )
    }
    input={''}
    history={true}
    suggestionItem={suggestionItem}
  />
);

export default RecentSearches;
