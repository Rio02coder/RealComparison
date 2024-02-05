import React from 'react';
import OwnerDescriptionProps from '../../types/components/property/OwnerDescription';
import {View, Text} from 'react-native';
import Title from '../Title';
import Divider from '../Divider';
import {SpecificProperty} from '../../types/Property';

const OwnerDetails = (property: SpecificProperty, is_for_sale: boolean) => {
  return (
    <>
      <Title
        title={'Owner'}
        size={23}
        flexDirection={'row'}
        top={10}
        bottom={3}
      />
      <View
        testID="owner_details_name"
        style={{flexDirection: 'row', justifyContent: 'space-between'}}>
        <Text style={{fontWeight: '500', fontSize: 20, color: '#989696'}}>
          Name
        </Text>
        <Text
          style={{
            fontWeight: '700',
            fontSize: 19,
            color: 'white',
          }}>{`${property.owner?.first_name} ${property.owner?.last_name}`}</Text>
      </View>
      {is_for_sale ? (
        <View
          testID="owner_details_email"
          style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <Text style={{fontWeight: '500', fontSize: 20, color: '#989696'}}>
            Email
          </Text>
          <Text
            style={{
              fontWeight: '700',
              fontSize: 19,
              color: 'white',
            }}>{`${property.owner?.email}`}</Text>
        </View>
      ) : null}
      <Divider width={'100%'} thickness={1} top={10} />
    </>
  );
};

const OwnerDescription = (props: OwnerDescriptionProps) => {
  return (
    <>
      {props.property.owner !== null && props.property.owner !== undefined
        ? OwnerDetails(props.property, props.property.for_sale)
        : null}
    </>
  );
};
export default OwnerDescription;
