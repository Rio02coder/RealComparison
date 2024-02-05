import React from 'react';
import CreatorDescriptionProps from '../../types/components/property/OwnerDescription';
import {View, Text} from 'react-native';
import Title from '../Title';
import Divider from '../Divider';

const CreatorDetails = (props: CreatorDescriptionProps) => {
  return (
    <>
      <Title
        title={'Creator'}
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
          }}>{`${props.property.creator?.first_name} ${props.property.creator?.last_name}`}</Text>
      </View>
      <Divider width={'100%'} thickness={1} top={10} />
    </>
  );
};

const CreatorDescription = (props: CreatorDescriptionProps) => {
  return (
    <>
      {props.property.creator !== null && props.property.creator !== undefined
        ? CreatorDetails({property: props.property})
        : null}
    </>
  );
};

export default CreatorDescription;
