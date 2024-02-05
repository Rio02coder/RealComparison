import React from 'react';
import AnimatedPropertyHeader from '../Headers/AnimatedPropertyHeader';
import PropertyHeader from './PropertyHeader';
import CompletePropertyHeaderProps from '../../types/components/Headers/CompletePropertyHeader';

const CompletePropertyHeader: React.FC<CompletePropertyHeaderProps> = props => (
  <>
    <AnimatedPropertyHeader scrollY={props.scrollY} />
    <PropertyHeader
      reduxProps={props}
      navigation={props.navigation}
      property={props.specificProperty}
    />
  </>
);

export default CompletePropertyHeader;
