import React from 'react';
import FilterCreatorProps from '../../../types/search/filters/FilterCreator';
import {FlatList, Text, SafeAreaView} from 'react-native';
import BooleanFilter from './BooleanFilter';
import BooleanKeys from '../../../types/search/filters/keys/BooleanKeys';
import Divider from '../../Divider';
import {WIDTH} from '../../../types/Screen';
import NumberFilter from './NumberFilter';
import NumberKeys from '../../../types/search/filters/keys/NumberKeys';
import StringFilter from './StringFilter';
import StringKeys from '../../../types/search/filters/keys/StringKeys';
import {stringFilterData} from '../../../utilities/search/filters/FilterData';

const FilterCreator = (creatorProps: FilterCreatorProps) => {
  return (
    <SafeAreaView style={{flex: 0}}>
      <Text
        style={{
          fontWeight: 'bold',
          fontSize: 26,
          marginBottom: 20,
          marginLeft: 10,
          color: 'white',
        }}>
        Filters
      </Text>
      <FlatList
        data={creatorProps.booleanFilters}
        renderItem={({item}) => (
          <BooleanFilter
            filter={creatorProps.props}
            filterKey={item as BooleanKeys}
          />
        )}
        horizontal={true}
        scrollEnabled={false}
      />
      <Divider width={WIDTH} thickness={2} top={5} />
      <FlatList
        data={creatorProps.numberFilters}
        renderItem={({item}) => (
          <NumberFilter
            filter={creatorProps.props}
            filterKey={item as NumberKeys}
          />
        )}
        numColumns={2}
        scrollEnabled={true}
        style={{marginTop: 5}}
      />
      <Divider width={WIDTH} thickness={2} top={3} />
      <FlatList
        data={creatorProps.stringFilters}
        renderItem={({item}) => (
          <StringFilter
            filter={creatorProps.props}
            filterKey={item as StringKeys}
            range={stringFilterData.get(item) as string[]}
          />
        )}
        scrollEnabled={false}
        style={{marginTop: 15}}
      />
    </SafeAreaView>
  );
};

export default FilterCreator;
