import Requester from '../../../../service/Requester';

/**
 * @param M If true, this generator must be initiated with some data inside.
 */
export interface RequesterGenerator<
  M extends Boolean = false,
  D = any,
  T = any,
  F = any,
  S = D,
> {
  data: M extends true ? D : undefined;
  generate: (data: M extends true ? D : undefined) => Requester<D, T, F, S>;
}
