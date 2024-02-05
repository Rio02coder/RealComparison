import React from 'react';
import {TouchableOpacity, View} from 'react-native';
import {Filter} from './Filter';
import {Switch} from 'react-native-paper';
import BooleanFilterState from '../../../types/search/filters/states/BooleanFilterState';
import BooleanProps from '../../../types/search/filters/Props/BooleanProps';
import {PropertyFilter} from '../../../types/Property';
import filterIcons from '../../../utilities/search/filters/filterIcons';
import styles from '../../../styles/defaults/buttons/Submit';

export default class BooleanFilter extends Filter<
  BooleanProps,
  BooleanFilterState
> {
  constructor(props: BooleanProps) {
    super(props);
    this.state = {
      disableSwitcher: this.getValue() === undefined,
      opacity: this.getValue() === undefined ? 0.2 : 1,
      enabled: this.getValue() ? (this.getValue() as boolean) : false,
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
    return value === undefined ? undefined : (value as boolean);
  }

  /**
   * This method is the concrete implementation of how the filter would
   * update the search filter state of the app.
   */
  public update() {
    super.setValue(
      !this.state.enabled,
      this.props.filterKey as unknown as keyof PropertyFilter,
    );
    this.setState({
      enabled: !this.state.enabled,
    });
  }

  private getPreviousStateValue() {
    return this.getValue() === undefined ? false : undefined;
  }

  /**
   * This method renders the visuals of the filter.
   */
  render() {
    return (
      <View style={{flexDirection: 'row', marginHorizontal: 22}}>
        <TouchableOpacity
          onPress={() =>
            this.setState(
              {
                opacity: this.state.disableSwitcher ? 1 : 0.2,
                disableSwitcher: !this.state.disableSwitcher,
                enabled: false,
              },
              () => {
                super.setValue(
                  this.getPreviousStateValue(),
                  this.props.filterKey as unknown as keyof PropertyFilter,
                );
              },
            )
          }>
          <View style={{opacity: this.state.opacity}}>
            {filterIcons.get(this.props.filterKey as keyof PropertyFilter)}
          </View>
        </TouchableOpacity>
        <Switch
          value={this.state.enabled}
          onChange={() => this.update()}
          color={styles.container.backgroundColor}
          disabled={this.state.disableSwitcher}
        />
      </View>
    );
  }
}
