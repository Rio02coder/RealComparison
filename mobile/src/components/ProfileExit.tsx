import React from 'react';
import {View, Text, TouchableOpacity, Alert} from 'react-native';
import ProfileExitProps from '../types/components/ProfileExit';
import {ScreenNames} from '../types/ScreenNames';
import ReduxProps from '../types/redux/props';
import {deleteUser} from '../service/Contactor/User';
import {StackNavigationProp} from '@react-navigation/stack';
import {NavigationStackTypes} from '../types/NavigationStackTypes';
import fullyLogout from '../types/utilities/fullyLogout';

const manageProfileDelete = (
  props: ReduxProps,
  navigation: StackNavigationProp<NavigationStackTypes, ScreenNames>,
) => {
  deleteUser(props).then(() =>
    navigation.replace(ScreenNames.Login, {logout: true}),
  );
};

const alertDeleteProfile = (
  props: ReduxProps,
  navigation: StackNavigationProp<NavigationStackTypes, ScreenNames>,
) => {
  Alert.alert('Delete Profile', undefined, [
    {
      text: 'Confirm',
      onPress: () => manageProfileDelete(props, navigation),
      style: 'destructive',
    },
    {
      text: 'Cancel',
      onPress: () => {},
      style: 'cancel',
    },
  ]);
};

const ProfileExit = (props: ProfileExitProps) => {
  return (
    <View
      style={{
        padding: 10,
        flex: 1,
      }}>
      <View
        testID="profile_exit_view"
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          position: 'absolute',
          bottom: 25,
          width: '97%',
          alignSelf: 'center',
        }}>
        <TouchableOpacity
          onPress={() => {
            fullyLogout(props.reduxProps, props.navigation);
          }}>
          <Text
            style={{
              color: 'white',
              textDecorationLine: 'underline',
              textDecorationColor: 'white',
              fontSize: 18,
            }}>
            Logout
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            alertDeleteProfile(props.reduxProps, props.navigation);
          }}>
          <Text
            style={{
              color: 'red',
              textDecorationLine: 'underline',
              textDecorationColor: 'red',
              fontSize: 18,
              marginRight: 5,
            }}>
            Delete Account
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ProfileExit;
