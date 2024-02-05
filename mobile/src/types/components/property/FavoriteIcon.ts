import ConcreteProperty from '../../ConcreteProperty';
import ReduxProps from '../../redux/props';
import {Property} from '../../Property';

type FilterIconProps = {
  propertyPayload: ConcreteProperty;
  reduxProps: ReduxProps;
  setProperty: (property: Property) => void;
};

export default FilterIconProps;
