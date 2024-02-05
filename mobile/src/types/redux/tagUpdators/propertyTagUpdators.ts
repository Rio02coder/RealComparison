import {Property} from '../../Property';
import PropertyAction from '../actions/property';
import ReduxProps from '../props';

type PropertyTagUpdatorType = {
  updater: [
    (props: ReduxProps) => Promise<Property[]>,
    (
      props: ReduxProps,
    ) => (properties: Property[]) => PropertyAction<Property[]>,
  ];
};

export default PropertyTagUpdatorType;
