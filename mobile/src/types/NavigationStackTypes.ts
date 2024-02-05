import React from 'react';
import {MemoryIDs} from '../utilities/storage/Memory';
import {SearchAutoCompleterProps} from './components/AutoCompleter';
import PropertyListProps from './components/listScreens/Property';
import {Property} from './Property';
import {ScreenNames} from './ScreenNames';
import SuggestionItemProps from './components/search/SuggestionItem';
import SearchAction from './redux/actions/search';
import SearchPayload from './redux/payloads/Search';
import {searchTags} from './redux/Tags';
import ReduxProps from "./redux/props";

type NavigationStackTypesStructure = {[key in string]: any};

export interface NavigationStackTypes extends NavigationStackTypesStructure {
  [ScreenNames.Login]: {logout?: boolean} | undefined;
  [ScreenNames.Signup]: undefined;
  [ScreenNames.Property]: {property: Property};
  [ScreenNames.PropertyList]: PropertyListProps;
  [ScreenNames.Core]: undefined;
  [ScreenNames.PropertyAdder]: undefined;
  [ScreenNames.EditProfile]: undefined;
  [ScreenNames.ChangePassword]: undefined;
  [ScreenNames.RecommendationsList]: undefined;
  [ScreenNames.Link]: undefined;
  [ScreenNames.Profile]: undefined;
  [ScreenNames.Search]: {
    autoCompleter?: SearchAutoCompleterProps<any>;
    setInput?: (newInput: string) => void;
    initialInput?: string;
    search?: (desiredSearch: string) => void;
    history?: MemoryIDs;
    suggestionItem: (props: SuggestionItemProps) => JSX.Element;
    filter?: (reduxProps: ReduxProps) => JSX.Element;
    searchAction: (search: string) => SearchAction<SearchPayload>;
    searchTag: searchTags;
  };
}
