import SuggestionItemProps from './search/SuggestionItem';
import React from 'react';

export default interface AutoCompleterProps<D = string> {
  /**
   * The data elements the auto completer will try to suggest accordingly.
   */
  data: Array<D>;

  /**
   * How one of the provided elements can be interpreted as text only. The returned string should really be
   * uniquely computed for every element in the provided data set.
   */
  stringify: (element: D) => string;

  /**
   * How to react when one element is being pressed (i.e.: autocomplete with the selected stringified version)
   */
  press: (element: D) => void;

  /**
   * What is the currently inputted string by the user in the holding parent of this autocompletion component.
   */
  input: string;

  history?: boolean;

  suggestionItem: (props: SuggestionItemProps) => JSX.Element;
}

/**
 * In the Search screen, the autocompletion component will get created inside itself with the relevant global state.
 */
export interface SearchAutoCompleterProps<D = string> {
  data: AutoCompleterProps<D>['data'];
  stringify: AutoCompleterProps<D>['stringify'];
  press?: AutoCompleterProps<D>['press'];
  suggestionItem: AutoCompleterProps<D>['suggestionItem'];
}
