import React, {useContext} from 'react';
import {View, Text} from 'react-native';
import StatisticsProps from '../../types/components/property/Statistics';
import FavoriteIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import Title from '../Title';
import PropertySection from './Section';
import {PropertyScreenContext} from '../../screens/Property';
import WaitingNotice from '../forms/WaitingNotice';

const Favorites = (numberOfFavorites: number) => (
  <View
    testID="number_of_favorites"
    style={{flexDirection: 'row', marginRight: 5}}>
    <FavoriteIcon name={'account-heart'} size={25} color={'white'} />
    <Text style={{color: 'white', fontSize: 18}}>{numberOfFavorites}</Text>
  </View>
);

const Views = (numberOfViews: number) => (
  <View
    testID="number_of_views"
    style={{flexDirection: 'row', marginRight: 15}}>
    <FavoriteIcon name={'account-eye'} size={25} color={'white'} />
    <Text style={{color: 'white', fontSize: 18}}>{numberOfViews}</Text>
  </View>
);

const Statistics = (props: StatisticsProps) => {
  const isWaiting =
    props.property.views === undefined &&
    props.property.favorites === undefined;
  return (
    <PropertySection>
      <Title
        title={'Property Stats'}
        size={23}
        flexDirection={'row'}
        top={10}
        bottom={3}
      />
      {!isWaiting ? (
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <View style={{flexDirection: 'row'}}>
            {Views(props.property.views)}
            {Favorites(props.property.favorites)}
          </View>
        </View>
      ) : (
        <WaitingNotice loading={true} error={'Could not load property'} />
      )}
    </PropertySection>
  );
};

export default Statistics;
