import React from 'react';
import {hp} from '../../types/Screen';
import Divider from '../Divider';

const PropertySection: React.FC = props => (
  <>
    {props.children}
    <Divider width={'100%'} thickness={1} top={hp(1.5)} />
  </>
);

export default PropertySection;
