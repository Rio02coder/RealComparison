import ReduxProps from '../../redux/props';
import {Property} from '../../Property';

type OwnershipProps = {
  reduxProps: ReduxProps;
  property: Property;
  is_owner?: boolean;
};

export default OwnershipProps;
