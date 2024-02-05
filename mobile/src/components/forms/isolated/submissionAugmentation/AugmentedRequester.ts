/* istanbul ignore file */
import React from 'react';
import Requester from '../../../../service/Requester';

export default class AugmentedRequester<T, F, S> extends Requester<
  any,
  T,
  F,
  S
> {
  private readonly setSynchronizedValues: React.Dispatch<any>;

  public constructor(
    baseRequester: Requester<any, T, F, S>,
    setSynchronizedValues: React.Dispatch<any>,
  ) {
    super(
      baseRequester.getPath(),
      baseRequester.getValues(),
      baseRequester.getDependency(),
    );
    this.setSynchronizedValues = setSynchronizedValues;
  }

  public query(): Promise<F> {
    return new Promise<F>((resolve, reject) => {
      super
        .query()
        .then(response => {
          this.setSynchronizedValues(this.getValues());
          return resolve(response);
        })
        .catch(err => reject(err));
    });
  }
}
