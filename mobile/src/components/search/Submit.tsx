import {MemoryIDs, setItem} from '../../utilities/storage/Memory';
import getRecentSearches from '../../utilities/storage/session/getRecentSearches';
import {TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import React from 'react';
import {ScreenProps} from '../../types/Screen';
import {ScreenNames} from '../../types/ScreenNames';

const saveSearchResult = (search: string, memory?: MemoryIDs) =>
  memory &&
  getRecentSearches().then(recentSearches => {
    !recentSearches.includes(search) &&
      setItem(memory, [search, ...recentSearches]);
  });

const SearchSubmit: React.FC<ScreenProps<ScreenNames.Search>> = ({
  search,
  route: {params},
}) =>
  params.search ? (
    <TouchableOpacity
      style={{height: 40, marginRight: 10}}
      onPress={() => {
        saveSearchResult(
          search.get(params.searchTag) as string,
          params.history,
        );
        (params.search as Function)(search);
      }}>
      <Icon name="search1" color={'white'} size={30} style={{marginTop: 8}} />
    </TouchableOpacity>
  ) : null;
export default SearchSubmit;
