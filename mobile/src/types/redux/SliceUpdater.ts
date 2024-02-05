import ReduxProps from './props';

type ReduxSliceUpdater<P = any> = (
  reduxProps: ReduxProps,
) => (payload: P) => void;

export default ReduxSliceUpdater;

export type ReduxSliceManager<P = any, T = any> = {
  update: ReduxSliceUpdater<P>;
  adapt: (response: T) => P;
};
