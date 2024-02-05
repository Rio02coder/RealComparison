import React, {useContext, useState} from 'react';
import {FlatList, Platform, View} from 'react-native';
import {ScreenNames} from '../../types/ScreenNames';
import {ScreenProps, WIDTH} from '../../types/Screen';
import appStyles from '../../styles/screens/Themes';
import connector from '../../redux/connector';
import NavigatedPropertyElement from './NavigatedPropertyElement';
import PropertyListProps from '../../types/components/property/PropertyList';
import {SearchScreenContext} from '../../screens/Core';
import {manageSearchData} from '../search/Limiter';

const WIDTH_DIFFERENCE = Platform.OS === 'android' ? 41 : 40;

export const CONTAINER_WIDTH = WIDTH - WIDTH_DIFFERENCE;

let stopFetchMore = true;

const PropertyList = (props: PropertyListProps) => {
  const {data, containerHeight, allSearchData, setData, core} =
    useContext(SearchScreenContext);
  const [lastIndex, setlastIndex] = useState<number>(data.length);

  const manageEndOfFlatlist = () => {
    if (!stopFetchMore) {
      const newSearchData = manageSearchData(allSearchData, lastIndex, data);
      const updatedProperties = newSearchData.newData;
      setData([...data, ...updatedProperties]);
      setlastIndex(newSearchData.lastIndex);
      stopFetchMore = false;
    }
  };

  return (
    <View testID="PropertyScreen" style={appStyles.mainAppTheme}>
      <FlatList
        data={data}
        keyExtractor={item => `${item.id}`}
        style={{paddingTop: containerHeight}}
        contentContainerStyle={{paddingBottom: 170}}
        onEndReachedThreshold={0.01}
        onScrollBeginDrag={() => (stopFetchMore = false)}
        renderItem={({item}) => (
          <NavigatedPropertyElement
            reduxProps={core as ScreenProps<ScreenNames.Core>}
            navigation={props.navigation}
            nextScreen={ScreenNames.Property}
            payload={{property: item}}
            property={item}
            containerHeight={239}
            containerWidth={CONTAINER_WIDTH}
            imageHeight={'100%'}
            imageWidth={'100%'}
          />
        )}
        onEndReached={manageEndOfFlatlist}
      />
    </View>
  );
};

export default connector(PropertyList);
