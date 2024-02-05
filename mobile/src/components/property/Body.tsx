import React from 'react';
import PropertyProfile from './Profile';
import CaptionedDescription from './CaptionedDescription';
import OwnerDescription from './OwnerDescription';
import Statistics from './Statistics';
import Ownership from './Ownership';
import SellingInfo from './SellingInfo';
import PropertyLocation from './Location';
import AnimatedScrollView from '../AnimatedScroll';
import PropertyBodyProps from '../../types/components/property/Body';
import {View} from 'react-native';
import CreatorDescription from './CreatorDescription';

const PropertyBody: React.FC<PropertyBodyProps> = props => (
  <AnimatedScrollView scrollY={props.scrollY}>
    <PropertyProfile
      {...props}
      isUserOwnerOfThisProperty={props.isUserOwnerOfThisProperty}
    />
    <View testID="body_parent" style={{paddingLeft: 10, paddingRight: 10}}>
      <CaptionedDescription
        property={props.property}
        isUserOwnerOfThisProperty={props.isUserOwnerOfThisProperty}
      />
      <OwnerDescription property={props.property} />
      <CreatorDescription property={props.property} />
      <Statistics property={props.property} />
      <Ownership
        reduxProps={props}
        property={props.property}
        is_owner={props.isUserOwnerOfThisProperty}
      />
      <SellingInfo property={props.property} />
    </View>
    <PropertyLocation property={props.property} />
  </AnimatedScrollView>
);

export default PropertyBody;
