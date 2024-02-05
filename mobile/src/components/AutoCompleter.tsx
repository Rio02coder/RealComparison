import React, {useEffect, useState} from 'react';
import AutoCompleterProps from '../types/components/AutoCompleter';
import {FlatList, TouchableOpacity} from 'react-native';

export default function AutoCompleter<D = string>(
  props: AutoCompleterProps<D>,
) {
  const [suggestions, setSuggestions] = useState<D[]>([]);

  useEffect(() => setSuggestions(props.data), []);

  const filter = () => {
    const newSuggestions = new Array<D>();
    for (let i = 0; i < props.data.length; i++) {
      const possiblyRelevantData = props.data[i];
      const suggestion = props.stringify(possiblyRelevantData);
      if (isSuggestionRelevant(suggestion)) {
        newSuggestions.push(possiblyRelevantData);
      }
    }
    setSuggestions(newSuggestions);
  };

  useEffect(filter, [props.input]);

  const renderItem: FlatList<D>['props']['renderItem'] = ({item}) => (
    <TouchableOpacity onPress={() => props.press(item)}>
      <props.suggestionItem
        suggestion={props.stringify(item)}
        history={props.history}
      />
    </TouchableOpacity>
  );

  const isSuggestionRelevant = (suggestion: string): boolean =>
    suggestion.toLowerCase().includes(props.input.toLowerCase());

  return props.suggestionItem !== undefined ? (
    <FlatList<D>
      data={suggestions}
      renderItem={renderItem}
      keyExtractor={(item, index) => `${props.stringify(item)} (${index})`}
    />
  ) : null;
}
