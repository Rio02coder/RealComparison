import sellingInfoProps from '../../types/components/property/SellingInfo';
import {View, Text} from 'react-native';
import React from 'react';
import sellingInfoStyles from '../../styles/components/property/SellingInfo';
import Divider from '../Divider';
import {WIDTH} from '../../types/Screen';
import {formatPrice} from '../../utilities/property/PriceFormatter';
import SellingInfoHeader from '../../types/components/property/SellingInfoHeader';

const getSellStatusIcon = (forSale: boolean) => {
  return (
    <View testID="sell_status_icon" style={{flexDirection: 'row-reverse'}}>
      <Text
        style={{
          fontSize: 16,
          color: 'white',
          marginVertical: 5,
          textDecorationLine: forSale ? 'underline' : 'underline line-through',
        }}>
        For Sale
      </Text>
    </View>
  );
};

const SellingInfo = (props: sellingInfoProps) => {
  return (
    <View testID="selling_info_header">
      <SellingInfoHeader
        percentageDifference={props.property.percentage_difference}
      />
      <View
        testID="property_price"
        style={[
          sellingInfoStyles.container,
          {flexDirection: 'row', justifyContent: 'space-between'},
        ]}>
        <Text style={sellingInfoStyles.text}>Price: </Text>
        <Text style={sellingInfoStyles.text}>{`$ ${formatPrice(
          props.property.predicted_price,
        )}`}</Text>
      </View>
      {getSellStatusIcon(props.property.for_sale)}
      <Divider width={'100%'} thickness={1} top={3} />
    </View>
  );
};

export default SellingInfo;
