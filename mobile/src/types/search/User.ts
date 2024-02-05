import ReduxProps from '../redux/props';
import {Property} from '../Property';

type UserBarProps = {
  reduxProps: ReduxProps;
  property: Property;
  setOpened: (value: boolean) => void;
};

export default UserBarProps;
