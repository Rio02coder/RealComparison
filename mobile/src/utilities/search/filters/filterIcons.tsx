import {PropertyFilter} from '../../../types/Property';
import CoolingIcon from 'react-native-vector-icons/Ionicons';
import HeatingIcon from 'react-native-vector-icons/FontAwesome5';
import BedIcon from 'react-native-vector-icons/MaterialIcons';
import GarageIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import StoriesIcon from 'react-native-vector-icons/FontAwesome';
import BathtubIcon from 'react-native-vector-icons/MaterialIcons';
import LotSizeIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import LivingAreaIcon from 'react-native-vector-icons/Ionicons';
import CenterDistanceIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import AgeIcon from 'react-native-vector-icons/MaterialIcons';
import TypeIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import {ReactNode} from 'react';
import React from 'react';

const filterIcons = new Map<keyof PropertyFilter, ReactNode>([
  [
    'has_cooling',
    <CoolingIcon name={'md-snow-sharp'} size={30} color={'white'} />,
  ],
  [
    'has_heating',
    <HeatingIcon
      name={'thermometer-three-quarters'}
      size={30}
      color={'white'}
    />,
  ],
  [
    'has_garage',
    <GarageIcon name={'garage-variant'} size={30} color={'white'} />,
  ],
  ['max_bedrooms', <BedIcon name={'king-bed'} size={30} color={'white'} />],
  ['min_bedrooms', <BedIcon name={'king-bed'} size={30} color={'white'} />],
  ['max_bathrooms', <BathtubIcon name={'bathtub'} size={30} color={'white'} />],
  ['min_bathrooms', <BathtubIcon name={'bathtub'} size={30} color={'white'} />],
  ['max_stories', <StoriesIcon name={'building'} size={30} color={'white'} />],
  ['min_stories', <StoriesIcon name={'building'} size={30} color={'white'} />],
  [
    'max_lot_size',
    <LotSizeIcon name={'floor-plan'} size={30} color={'white'} />,
  ],
  [
    'min_lot_size',
    <LotSizeIcon name={'floor-plan'} size={30} color={'white'} />,
  ],
  [
    'max_living_area',
    <LivingAreaIcon name={'map'} size={30} color={'white'} />,
  ],
  [
    'min_living_area',
    <LivingAreaIcon name={'map'} size={30} color={'white'} />,
  ],
  ['age', <AgeIcon name={'timelapse'} size={30} color={'white'} />],
  ['type', <TypeIcon name={'city'} size={30} color={'white'} />],
  [
    'distance_from_center',
    <CenterDistanceIcon
      name={'map-marker-distance'}
      size={30}
      color={'white'}
    />,
  ],
]);

export default filterIcons;
