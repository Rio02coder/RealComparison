import {ConnectedProps} from 'react-redux';
import connector from '../../redux/connector';

type ReduxProps = ConnectedProps<typeof connector>;

export default ReduxProps;