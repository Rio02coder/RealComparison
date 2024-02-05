import React, {useState} from 'react';
import {TouchableOpacity, Text} from 'react-native';
import Tooltip from 'react-native-walkthrough-tooltip';
import PredictedPriceInformationProps from '../../types/components/property/PredictedPriceInformation';
import Icon from 'react-native-vector-icons/Ionicons';
import appStyles from '../../styles/screens/Themes';
import {formatPercentage} from '../../utilities/property/PriceFormatter';
import WaitingNotice from '../forms/WaitingNotice';

const getPredictedPriceInformationText = (percentageDifference: number) => {
  return (
    <Text
      style={{
        color: 'white',
      }}>{`The difference from latest price is: ${formatPercentage(
      percentageDifference,
    )}`}</Text>
  );
};

const PredictedPriceInformation = (props: PredictedPriceInformationProps) => {
  const [isVisible, setIsVisible] = useState(false);
  return props.percentageDifference !== undefined ? (
    <Tooltip
      isVisible={isVisible}
      onClose={() => setIsVisible(false)}
      contentStyle={appStyles.mainAppTheme}
      content={getPredictedPriceInformationText(props.percentageDifference)}
      placement={'top'}>
      <TouchableOpacity
        onPress={() => setIsVisible(true)}
        style={{marginTop: 13}}>
        <Icon
          name={'ios-information-circle-outline'}
          size={20}
          color={'#ffffff'}
        />
      </TouchableOpacity>
    </Tooltip>
  ) : (
    <WaitingNotice loading={true} error={'Could not load property'} />
  );
};

export default PredictedPriceInformation;
