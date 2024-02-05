import React from 'react';
import {View} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import ReduxProps from '../../../types/redux/props';
import BottomSheet from '../../BottomSheet';
import {hp} from '../../../types/Screen';
import FilterCreator from './Creator';
import {
  booleanFilterKeys,
  numberFilterKeys,
  stringFilterKeys,
} from '../../../utilities/search/filters/FilterData';
import FilterButtonProps from '../../../types/search/filters/FilterButton';

const FilterButton = (props: FilterButtonProps) => {
  return (
    <View style={{marginTop: 6, marginRight: 2}}>
      <BottomSheet
        elementToClickOn={
          <View>
            <Icon name={'ios-options-sharp'} size={30} color={'white'} />
          </View>
        }
        height={hp(60)}>
        <FilterCreator
          booleanFilters={booleanFilterKeys}
          stringFilters={stringFilterKeys}
          numberFilters={numberFilterKeys}
          props={props.reduxProps}
        />
      </BottomSheet>
    </View>
  );
};

export default FilterButton;
