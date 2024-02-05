import React from 'react';
import {Platform, View} from 'react-native';
import connector from '../redux/connector';
import appStyles from '../styles/screens/Themes';
import {hp, ScreenProps, WIDTH} from '../types/Screen';
import {ScreenNames} from '../types/ScreenNames';
import Icon from 'react-native-vector-icons/FontAwesome';
import Title from '../components/Title';
import Divider from '../components/Divider';
import {ProfileScreens} from '../types/components/screens/ProfileScreens';
import UserLink from '../components/AppNavigation/UserLink';
import defaultFeeder from '../utilities/navigation/defaultFeeder';
import {StackNavigationProp} from '@react-navigation/stack';
import {NavigationStackTypes} from '../types/NavigationStackTypes';
import {PropertyListScreens} from '../types/components/screens/PropertyListScreens';
import ProfileExit from '../components/ProfileExit';

const Profile: React.FC<ScreenProps<ScreenNames.Profile>> = props => {
  const padding = Platform.OS === 'android' ? 15 : 10;
  return (
    <View
      testID="ProfilePage"
      style={[
        appStyles.mainAppTheme,
        {paddingLeft: padding, paddingRight: padding},
      ]}>
      <Icon
        name="user-circle"
        color={'white'}
        size={40}
        style={{marginTop: 65, marginLeft: 10}}
      />
      <Title
        title={props.user?.firstName}
        size={30}
        flexDirection="row"
        left={10}
        top={8}
      />
      <Divider width={WIDTH - 15} thickness={1} top={hp(5)} />
      <Title
        title="Account Settings"
        size={25}
        flexDirection="row"
        left={10}
        top={hp(5)}
        bottom={hp(2.5)}
      />
      {ProfileScreens.map(profileScreen => {
        const {name, iconName, iconSize, iconStyle, textStyle} =
          profileScreen[0];
        const screenName = profileScreen[1];
        const condition = profileScreen[2];
        return (
          condition(props.user) && (
            <UserLink
              payload={defaultFeeder(screenName)}
              navigation={
                props.navigation as unknown as StackNavigationProp<
                  NavigationStackTypes,
                  ScreenNames
                >
              }
              nextScreen={screenName}
              text={name}
              icon={iconName}
              iconSize={iconSize}
              style={iconStyle}
              textStyle={textStyle}
              key={name}
            />
          )
        );
      })}
      <Title
        title={'My Properties'}
        size={25}
        flexDirection={'row'}
        left={10}
        top={hp(5)}
        bottom={hp(2.5)}
      />
      {PropertyListScreens.map(propertyScreen => (
        <UserLink
          key={propertyScreen[0].name}
          text={propertyScreen[0].name}
          icon={propertyScreen[0].iconName}
          nextScreen={propertyScreen[1]}
          payload={propertyScreen[2]}
          navigation={
            props.navigation as unknown as StackNavigationProp<
              NavigationStackTypes,
              ScreenNames
            >
          }
          iconSize={propertyScreen[0].iconSize}
        />
      ))}
      <ProfileExit
        reduxProps={props}
        navigation={
          props.navigation as unknown as StackNavigationProp<
            NavigationStackTypes,
            ScreenNames
          >
        }
      />
    </View>
  );
};

export default connector(Profile);
