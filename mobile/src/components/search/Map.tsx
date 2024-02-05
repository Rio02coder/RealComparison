import React, {useContext} from 'react';
import {View} from 'react-native';
import NavigationDrawer from '../AppNavigation/NavigationDrawer';
import Map from '../maps/Map';
import connector from '../../redux/connector';
import {CoordinateDeltas} from '../../types/CoordinateDeltas';
import MapSearchProps from '../../types/components/search/Map';
import {SearchScreenContext} from '../../screens/Core';
import NavigatedPropertyElement from '../property/NavigatedPropertyElement';
import {CONTAINER_WIDTH} from '../property/PropertyList';
import GestureRecognizer from 'react-native-swipe-gestures';
import {ScreenNames} from '../../types/ScreenNames';
import getFeeder from '../../utilities/navigation/feederCreator';
import {tags} from '../../types/redux/Tags';
import {FavouriteHeaderTitle} from '../../types/components/listScreens/Titles';
import ReduxProps from '../../types/redux/props';

const MapScreen: React.FC<MapSearchProps> = props => {
  const {data, setPropertyToShowOnMap, propertyToShow, core} =
    useContext(SearchScreenContext);
  return (
    <View style={{flex: 1}}>
      <Map
        height={250}
        top={0}
        latitude={30.266666}
        longitude={-97.73333}
        latitudeDelta={CoordinateDeltas.LATITUDE_DELTA}
        longitudeDelta={CoordinateDeltas.LONGITUDE_DELTA}
        data={data}
        setPropertyToShow={setPropertyToShowOnMap}
      />
      <NavigationDrawer
        feeder={getFeeder(ScreenNames.PropertyList, {
          tag: tags.FAVORITE,
          title: FavouriteHeaderTitle.FAVORITE_HEADER_TITLE,
          onEmptyDataMessage: FavouriteHeaderTitle.EMPTY_DATA_MESSAGE,
          onEmptyDataTitle: FavouriteHeaderTitle.EMPTY_DATA_TITLE,
        })}
        navigation={props.navigation}
      />
      {propertyToShow && (
        <GestureRecognizer onSwipeLeft={() => setPropertyToShowOnMap(null)}>
          <View style={{position: 'absolute', bottom: 0}}>
            <NavigatedPropertyElement
              reduxProps={core as ReduxProps}
              navigation={props.navigation}
              nextScreen={ScreenNames.Property}
              payload={{property: propertyToShow}}
              property={propertyToShow}
              containerHeight={100}
              containerWidth={CONTAINER_WIDTH}
              imageHeight={'100%'}
              imageWidth={'100%'}
            />
          </View>
        </GestureRecognizer>
      )}
    </View>
  );
};

export default connector(MapScreen);
