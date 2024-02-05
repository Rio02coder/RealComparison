import ChainErrorHandler from '../../../../utilities/errors/backend/ChainErrorHandler';

export interface ErrorsMap<D = any, DR = any, T = any, F = any, S = D>
  extends Map<number, ChainErrorHandler<D, DR, T, F, S>> {}
