import React from 'react';
import FilterProps from '../../../types/search/filters/Props/Filter';
import {PropertyFilter} from '../../../types/Property';

export abstract class Filter<
  Props extends FilterProps,
  State,
> extends React.Component<Props, State> {
  protected constructor(props: Props) {
    super(props);
  }

  public setValue<T extends keyof PropertyFilter>(
    newValue: PropertyFilter[T],
    keyToUse: T,
  ) {
    this.props.filter.updateFilter({
      filterKey: keyToUse,
      value: newValue,
    });
  }

  public abstract update(): void;
}
