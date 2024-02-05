import React, {useEffect} from 'react';
import {FlatList, View} from 'react-native';
import appStyles from '../styles/screens/Themes';
import {Property} from '../types/Property';
import getRecommendations from '../service/Contactor/Property/Recommendations';
import {hp, ScreenProps} from '../types/Screen';
import {ScreenNames} from '../types/ScreenNames';
import Title from '../components/Title';
import NavigatedPropertyElement from '../components/property/NavigatedPropertyElement';
import {StackNavigationProp} from '@react-navigation/stack';
import {NavigationStackTypes} from '../types/NavigationStackTypes';
import {CONTAINER_WIDTH} from '../components/property/PropertyList';
import connector from '../redux/connector';

const Recommendations = (
  props: ScreenProps<ScreenNames.RecommendationsList>,
) => {
  const [data, setData] = React.useState<Property[]>([]);
  useEffect(() => {
    getRecommendations(props).then(properties => setData(properties));
  }, []);
  return (
    <View style={appStyles.mainAppTheme}>
      <Title
        testID="rec_list_title"
        title={'Recommendations'}
        size={30}
        flexDirection="row"
        top={hp(9)}
        left={18}
      />
      <FlatList
        data={data}
        renderItem={({item}) => (
          <NavigatedPropertyElement
            reduxProps={props}
            navigation={
              props.navigation as unknown as StackNavigationProp<
                NavigationStackTypes,
                ScreenNames
              >
            }
            nextScreen={ScreenNames.Property}
            payload={{property: item}}
            containerHeight={239}
            containerWidth={CONTAINER_WIDTH}
            property={item}
            imageHeight={'100%'}
            imageWidth={'100%'}
          />
        )}
      />
    </View>
  );
};

export default connector(Recommendations);
