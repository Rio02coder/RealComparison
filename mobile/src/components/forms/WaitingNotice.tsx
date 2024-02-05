import React from 'react';
import Loading from '../Loading';
import {Text} from 'react-native';
import errorNoteStyles from '../../styles/defaults/fields/ErrorNote';
import WaitingNoticeProps from '../../types/components/forms/WaitingNotice';

const WaitingNotice: React.FC<WaitingNoticeProps> = ({loading, error}) =>
  loading ? (
    <Loading />
  ) : (
    <Text style={[errorNoteStyles.error, {marginTop: 10}]}>
      {error ? error : ''}
    </Text>
  );

export default WaitingNotice;
