import React, {useState} from 'react';
import {FlatList, Text, View, ScrollView} from 'react-native';
import connector from '../redux/connector';
import propertyDescriptionStyles from '../styles/components/property/Descriptions';
import appStyles from '../styles/screens/Themes';
import {hp, ScreenProps} from '../types/Screen';
import {ScreenNames} from '../types/ScreenNames';
import NavigatedPropertyElement from '../components/property/NavigatedPropertyElement';
import {CONTAINER_WIDTH} from '../components/property/PropertyList';
import Refresher from '../components/Refresher';
import Title from '../components/Title';
import {Property} from '../types/Property';
import refresher from '../service/Contactor/refresher';

const PropertyList = (props: ScreenProps<ScreenNames.PropertyList>) => {
  const propertyListProps = props.route.params;
  const data = props.properties.get(propertyListProps.tag) as Property[];
  const [refreshing, setRefreshing] = useState<boolean>(false);
  /* istanbul ignore next */
  const onRefresh = () => {
    setRefreshing(true);
    refresher(props, propertyListProps.tag)
      .then(() => setRefreshing(false))
      .catch(() => setRefreshing(false));
  };
  return (
    <View testID="property_list" style={[appStyles.mainAppTheme]}>
      <Title
        testID="property_list_title"
        title={propertyListProps.title}
        size={30}
        flexDirection="row"
        top={hp(9)}
        left={18}
      />
      {data.length > 0 ? (
        <FlatList
          data={data}
          refreshControl={
            <Refresher refreshing={refreshing} onRefresh={onRefresh} />
          }
          renderItem={({item}) => {
            return (
              <NavigatedPropertyElement
                reduxProps={props}
                navigation={props.navigation}
                nextScreen={ScreenNames.Property}
                payload={{property: item}}
                property={item}
                containerHeight={239}
                containerWidth={CONTAINER_WIDTH}
                imageHeight={'100%'}
                imageWidth={'100%'}
              />
            );
          }}
          keyExtractor={item => `${item.id}`}
        />
      ) : (
        <ScrollView
          testID="empty_list_view"
          refreshControl={
            <Refresher refreshing={refreshing} onRefresh={onRefresh} />
          }>
          <Title
            testID="property_list_empty_title"
            title={propertyListProps.onEmptyDataTitle}
            top={hp(8)}
            size={24}
            left={19}
            flexDirection="row"
          />
          <Text
            testID="property_list_empty_message"
            style={{
              marginHorizontal: 21,
              marginVertical: 7,
              color: propertyDescriptionStyles.descriptionText.color,
            }}>
            {propertyListProps.onEmptyDataMessage}
          </Text>
        </ScrollView>
      )}
    </View>
  );
};

export default connector(PropertyList);
