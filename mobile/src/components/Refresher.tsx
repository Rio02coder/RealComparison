import React from 'react';
import {RefreshControl} from 'react-native';
import RefreshControlProps from '../types/components/Refresher';

const Refresher = (props: RefreshControlProps) => {
  return <RefreshControl {...props} />;
};

export default Refresher;
