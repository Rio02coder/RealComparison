import React from 'react';
import {View} from 'react-native';
import PredictedPriceInformationProps from './PredictedPriceInformation';
import Title from '../../../components/Title';
import PredictedPriceInformation from '../../../components/property/PredictedPriceInformation';

const SellingInfoHeader = (props: PredictedPriceInformationProps) => {
  return (
    <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
      <Title title={'Selling Info'} size={23} flexDirection={'row'} top={7} />
      <PredictedPriceInformation {...props} />
    </View>
  );
};

export default SellingInfoHeader;
