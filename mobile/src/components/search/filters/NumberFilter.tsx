import {Filter} from './Filter';
import React from 'react';
import {object} from 'yup';
import NumberProps from '../../../types/search/filters/Props/NumberProps';
import {PropertyFilter} from '../../../types/Property';
import NumberFilterState from '../../../types/search/filters/states/NumberFilterState';
import {View, TextInput, Alert} from 'react-native';
import {numberFilterText} from '../../../types/search/filters/FilterText';
import {numberFilterData} from '../../../utilities/search/filters/FilterData';
import NumberKeys from '../../../types/search/filters/keys/NumberKeys';
import filterIcons from '../../../utilities/search/filters/filterIcons';
import numberFilterStyles from '../../../styles/components/search/filters/NumberFilter';
import {ObjectShape} from 'yup/lib/object';

export default class NumberFilter extends Filter<
  NumberProps,
  NumberFilterState
> {
  state: NumberFilterState;

  constructor(props: NumberProps) {
    super(props);
    const value = this.getValue();
    this.state = {
      numberChosen: value,
      stringOnTextFiled: value ? String(value) : '',
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
      this.props.filter.filters[this.props.filterKey as keyof PropertyFilter];
    return value ? (value as number) : undefined;
  }

  /**
   * This method is the concrete implementation of how the filter would
   * update the search filter state of the app.
   */
  public update() {
    this.setState({numberChosen: this.getFilterUpdateData()}, () =>
      super.setValue(
        this.state.numberChosen,
        this.props.filterKey as unknown as keyof PropertyFilter,
      ),
    );
  }

  /**
   * This method alerts the user if anything seems wrong
   * with user input
   * @param title: The title of the message
   * @constructor
   * @private
   */
  private AlterUser(title: string) {
    Alert.alert(title);
  }

  /**
   * This is a manager method called when user's value is incorrect.
   * @private
   */
  private manageIncorrectValue() {
    this.AlterUser('Incorrect value placed in the filter.');
    this.setState({stringOnTextFiled: ''});
  }

  /**
   * This method modifies the user's data to a format which
   * will be used by the filter's validator.
   * @private
   */
  private getDataToEvaluate() {
    if (isNaN(Number(this.state.stringOnTextFiled))) {
      return '';
    }
    if (this.state.stringOnTextFiled?.length === 0) {
      return null;
    }
    return Number(this.state.stringOnTextFiled);
  }

  /**
   * This method modifies the user's string input to the format
   * which will be used to update the search filter state of the app.
   * This method should only be called when the data is validated.
   * @private
   */
  private getFilterUpdateData() {
    if (this.state.stringOnTextFiled?.length === 0) {
      return undefined;
    }
    return Number(this.state.stringOnTextFiled);
  }

  /**
   * This method validates the user's input.
   * @private
   */
  private validate() {
    const validationSchema = object(
      numberFilterData.get(
        this.props.filterKey as keyof NumberKeys,
      ) as ObjectShape,
    );
    const valueToEvaluate = this.getDataToEvaluate();
    validationSchema
      .validate({numberChosen: valueToEvaluate})
      .then(() => this.update())
      .catch(() => this.manageIncorrectValue());
  }

  /**
   * This method renders the visuals of the filter.
   */
  render() {
    return (
      <View style={{flexDirection: 'row'}}>
        {filterIcons.get(this.props.filterKey as keyof PropertyFilter)}
        <View style={numberFilterStyles.container}>
          <TextInput
            style={numberFilterStyles.textInput}
            autoCapitalize={'none'}
            placeholder={numberFilterText(this.props.filterKey)}
            placeholderTextColor={'#4d4b4b'}
            autoCorrect={false}
            value={this.state.stringOnTextFiled}
            onChangeText={value =>
              this.setState({
                stringOnTextFiled: value,
              })
            }
            onEndEditing={() => this.validate()}
          />
        </View>
      </View>
    );
  }
}
