import {Filter} from './Filter';
import {PropertyFilter} from '../../../types/Property';
import React from 'react';
import {TouchableOpacity, View} from 'react-native';
import StringProps from '../../../types/search/filters/Props/StringProps';
import StringFilterState from '../../../types/search/filters/states/StringFilterState';
import filterIcons from '../../../utilities/search/filters/filterIcons';
import {Dropdown} from 'react-native-element-dropdown';
import getModifiedData from '../../../utilities/search/filters/getModifiedData';
import stringFilterStyle from '../../../styles/components/search/filters/StringFilter';
import appStyles from '../../../styles/screens/Themes';

export default class StringFilter extends Filter<
  StringProps,
  StringFilterState
> {
  range: string[];
  state: StringFilterState;

  constructor(props: StringProps) {
    super(props);
    this.range = props.range;
    this.state = {
      stringChosen: this.getValue(),
    };
  }

  /**
   * This method gets the value of this filter
   * from the search filter state.
   * If the value is not found this would return
   * undefined.
   * @private
   */
  private getValue() {
    const value =
      this.props.filter.filters[
        this.props.filterKey as unknown as keyof PropertyFilter
      ];
    return value ? (value as string) : undefined;
  }

  /**
   * This method is the concrete implementation of how the filter would
   * update the search filter state of the app.
   */
  public update() {
    super.setValue(
      this.state.stringChosen,
      this.props.filterKey as keyof PropertyFilter,
    );
  }

  /**
   * This method renders the visuals of the filter.
   */
  render() {
    return (
      <View style={{flexDirection: 'row'}}>
        <TouchableOpacity
          onPress={() =>
            this.setState({stringChosen: undefined}, () => this.update())
          }
          style={{marginRight: 5}}>
          {filterIcons.get(this.props.filterKey as keyof PropertyFilter)}
        </TouchableOpacity>
        <Dropdown
          data={getModifiedData(this.props.range)}
          value={this.state.stringChosen as string}
          style={stringFilterStyle.dropdown}
          placeholderStyle={stringFilterStyle.placeHolder}
          selectedTextStyle={stringFilterStyle.placeHolder}
          containerStyle={stringFilterStyle.container}
          activeColor={appStyles.authenticationScreenTheme.backgroundColor}
          dropdownPosition={'auto'}
          labelField={'label'}
          valueField={'value'}
          onChange={item =>
            this.setState({stringChosen: item.value}, () => this.update())
          }
        />
      </View>
    );
  }
}
