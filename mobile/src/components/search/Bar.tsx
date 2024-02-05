import React, {useContext, useEffect, useState} from 'react';
import {Text, TouchableOpacity} from 'react-native';
import styles from '../../styles/defaults/fields/InputContent';
import Icon from 'react-native-vector-icons/AntDesign';
import {WIDTH} from '../../types/Screen';
import {SearchScreenContext} from '../../screens/Core';
import {ScreenNames} from '../../types/ScreenNames';
import {Property} from '../../types/Property';
import {SearchAutoCompleterProps} from '../../types/components/AutoCompleter';
import SessionManager from '../../utilities/errors/backend/SessionManager';
import ENDPOINTS from '../../service/endpoints';
import ConcreteProperty from '../../types/ConcreteProperty';
import {MemoryIDs} from '../../utilities/storage/Memory';
import limiter from './Limiter';
import noDataAlert from './Alerts';
import search from '../../utilities/search/search';
import SuggestionItemProps from '../../types/components/search/SuggestionItem';
import Location from './SuggestionItems/Location';
import FilterButton from './filters/FilterButton';
import {searchTags} from '../../types/redux/Tags';
import ReduxProps from '../../types/redux/props';

const SearchBar: React.FC = () => {
  const {core, setData, setAllSearchData} = useContext(SearchScreenContext);
  const [address, setAddress] = useState<string>();
  const [allProperties, setAllProperties] = useState<Property[]>([]);
  const [shouldSearch, setShouldSearch] = useState<boolean>(false);
  const setDataOnRetrieval = (
    dataToShow: Property[],
    completeData: Property[],
  ) => {
    setAllSearchData(completeData);
    setData(dataToShow);
  };

  const manageSearchOnFiltering = (properties: Property[]) => {
    if (properties.length === 0) {
      noDataAlert();
      setDataOnRetrieval([], []);
    } else {
      setDataOnRetrieval(limiter(properties), properties);
    }
  };

  const resetData = () => {
    if (!core) {
      return;
    }
    new SessionManager<void, Property[], void, Property[]>(
      undefined,
      ENDPOINTS.PROPERTY.RETRIEVE,
      'GET',
      core,
      properties => manageSearchOnFiltering(properties),
    ).query();
  };

  const fetchLocations = () => {
    if (!core) {
      return;
    }
    new SessionManager<void, Property[], void, Property[]>(
      undefined,
      ENDPOINTS.PROPERTY.RETRIEVE,
      'GET',
      core,
      properties => setAllProperties(limiter(properties)),
    ).query();
  };

  const handleSearching = () => {
    setShouldSearch(false);
    if (!shouldSearch) {
      return;
    }
    search(address, manageSearchOnFiltering, resetData, core);
  };

  useEffect(handleSearching, [shouldSearch]);
  useEffect(() => fetchLocations(), []);

  const presentProperty = (property: Property) =>
    new ConcreteProperty(property).present();

  const revealSearcher = () =>
    core?.navigation.navigate(ScreenNames.Search, {
      autoCompleter: {
        data: allProperties,
        stringify: presentProperty,
      } as SearchAutoCompleterProps<Property>,
      setInput: setAddress,
      history: MemoryIDs.SEARCH,
      initialInput: address,
      search: () => {
        setShouldSearch(true);
        core.navigation.goBack();
      },
      suggestionItem: (props: SuggestionItemProps) => <Location {...props} />,
      filter: (reduxProps: ReduxProps) => (
        <FilterButton reduxProps={reduxProps} />
      ),
      searchAction: core.updateLocation,
      searchTag: searchTags.LOCATION,
    });

  return (
    <TouchableOpacity
      testID="searchBar"
      style={[styles.input, {width: WIDTH - 30, marginLeft: 15, padding: 15}]}
      onPress={revealSearcher}>
      <Icon name={'search1'} style={styles.icon} />
      <Text style={[styles.text, {marginRight: 30}]}>
        {address ? address : 'Search'}
      </Text>
    </TouchableOpacity>
  );
};

export default SearchBar;
