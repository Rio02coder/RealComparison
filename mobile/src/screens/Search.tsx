import React, {useEffect} from 'react';
import {LogBox} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import connector from '../redux/connector';
import appStyles from '../styles/screens/Themes';
import {ScreenProps} from '../types/Screen';
import {ScreenNames} from '../types/ScreenNames';
import AutoCompleterProps from '../types/components/AutoCompleter';
import RecentSearches from '../components/search/RecentSearches';
import SearchAutoCompleter from '../components/search/AutoCompleter';
import SearchHeader from '../components/search/Header';

LogBox.ignoreLogs([
  'Non-serializable values were found in the navigation state',
]);

const Search: React.FC<ScreenProps<ScreenNames.Search>> = props => {
  const handleParentInputChange = () => {
    const setInput = props.route.params.setInput;
    if (setInput) {
      setInput(props.search.get(props.route.params.searchTag) as string);
    }
  };

  const handleImposedDefaultInput = () => {
    const {initialInput} = props.route.params;
    if (!initialInput) {
      return;
    }
    props.route.params.searchAction(initialInput);
  };

  useEffect(handleParentInputChange, [
    props.route.params.setInput,
    props.search,
  ]);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(handleImposedDefaultInput, []);
  // const refRBSheet = useRef<RBSheet>(null);

  return (
    <SafeAreaView testID="searchScreen" style={appStyles.mainAppTheme}>
      <SearchHeader {...props} />
      <RecentSearches {...props} />
      <SearchAutoCompleter {...props} />
    </SafeAreaView>
  );
};

export const defaultPressHandler = (
  element: any,
  updateSearch: ScreenProps<ScreenNames.Search>['route']['params']['searchAction'],
  stringify: AutoCompleterProps<any>['stringify'],
) => updateSearch(stringify(element));

export default connector(Search);
