import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer, StackActions} from '@react-navigation/native';
import {ScreenNames} from '../src/types/ScreenNames';
import {NavigationStackTypes} from '../src/types/NavigationStackTypes';
import Login from '../src/screens/Login';
import SignUp from '../src/screens/SignUp';
import PropertyScreen from '../src/screens/Property';
import Core from '../src/screens/Core';
import PropertyAdder from '../src/screens/PropertyAdder';
import Search from '../src/screens/Search';
import Profile from '../src/screens/Profile';
import EditProfile from '../src/screens/EditProfile';
import ChangePassword from '../src/screens/ChangePassword';
import PropertyList from '../src/screens/PropertyList';
import Recommendations from '../src/screens/Recommendations';

const Stack = createStackNavigator<NavigationStackTypes>();

export default class Navigator extends React.Component {
  public render() {
    return (
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName={ScreenNames.Login}
          screenOptions={{headerShown: false}}>
          <Stack.Screen name={ScreenNames.Login} component={Login} />
          <Stack.Screen name={ScreenNames.Signup} component={SignUp} />
          <Stack.Screen
            name={ScreenNames.Property}
            component={PropertyScreen}
          />
          <Stack.Screen name={ScreenNames.Core} component={Core} />
          <Stack.Screen name={ScreenNames.Profile} component={Profile} />
          <Stack.Screen name={ScreenNames.Search} component={Search} />
          <Stack.Screen
            name={ScreenNames.PropertyAdder}
            component={PropertyAdder}
          />
          <Stack.Screen
            name={ScreenNames.EditProfile}
            component={EditProfile}
          />
          <Stack.Screen
            name={ScreenNames.ChangePassword}
            component={ChangePassword}
          />
          <Stack.Screen
            name={ScreenNames.PropertyList}
            component={PropertyList}
          />
          <Stack.Screen
            name={ScreenNames.RecommendationsList}
            component={Recommendations}
          />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}
