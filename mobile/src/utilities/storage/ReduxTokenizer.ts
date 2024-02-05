import ReduxSliceUpdater from '../../types/redux/SliceUpdater';
import {SessionTokens} from '../../types/utilities/storage/Session';

const getUserUpdatingSlice: ReduxSliceUpdater<SessionTokens> =
  reduxProps => newTokens =>
    reduxProps.update({token: newTokens});

export default getUserUpdatingSlice;
