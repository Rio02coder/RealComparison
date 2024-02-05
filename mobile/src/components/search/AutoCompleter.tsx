import AutoCompleter from '../AutoCompleter';
import React from 'react';
import {defaultPressHandler} from '../../screens/Search';
import {ScreenProps} from '../../types/Screen';
import {ScreenNames} from '../../types/ScreenNames';

const SearchAutoCompleter: React.FC<ScreenProps<ScreenNames.Search>> = ({
  search,
  route: {
    params: {autoCompleter, suggestionItem, searchAction, searchTag},
  },
}) => {
  if (!autoCompleter) {
    return null;
  }
  const {data, stringify, press} = autoCompleter;

  const getPressHandler = () =>
    press
      ? press
      : (element: any) => defaultPressHandler(element, searchAction, stringify);

  return (
    <AutoCompleter
      data={data}
      stringify={stringify}
      press={getPressHandler()}
      input={search.get(searchTag) as string}
      suggestionItem={suggestionItem}
    />
  );
};

export default SearchAutoCompleter;
