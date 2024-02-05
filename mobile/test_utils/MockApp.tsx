import {render} from '@testing-library/react-native';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {Provider} from 'react-redux';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationStackTypes} from '../src/types/NavigationStackTypes';
import {ScreenNames} from '../src/types/ScreenNames';
import Login from '../src/screens/Login';
import SignUp from '../src/screens/SignUp';
import configureStore from 'redux-mock-store';
import PropertyScreen from '../src/screens/Property';
import Core from '../src/screens/Core';
import Profile from '../src/screens/Profile';
import Search from '../src/screens/Search';
import PropertyAdder from '../src/screens/PropertyAdder';
import EditProfile from '../src/screens/EditProfile';
import ChangePassword from '../src/screens/ChangePassword';
import PropertyList from '../src/screens/PropertyList';
import mockProperty from './MockProperty';
import mockUser from './MockUser';
import mockProperties from './MockProperties';
import setupArgs from './SetupArgs';
import {tags} from '../src/types/redux/Tags';
import Recommendations from '../src/screens/Recommendations';

const Stack = createStackNavigator<NavigationStackTypes>();

const mockStore = configureStore([]);

const mockApp = ({
  initialScreen = ScreenNames.Login,
  user = mockUser,
  properties = mockProperties,
  property = undefined,
  propertyListParams = false,
}: setupArgs) =>
  render(
    <Provider
      store={mockStore({
        user,
        properties,
      })}>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName={initialScreen}
          screenOptions={{headerShown: false}}>
          <Stack.Screen name={ScreenNames.Login} component={Login} />
          <Stack.Screen name={ScreenNames.Signup} component={SignUp} />
          <Stack.Screen
            name={ScreenNames.Property}
            component={PropertyScreen}
            initialParams={{property}}
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
            initialParams={
              propertyListParams
                ? {
                    tag: tags.OWNED,
                    title: 'placeholder title',
                    onEmptyDataTitle: 'placeholder empty title',
                    onEmptyDataMessage: 'placeholder empty message',
                  }
                : {}
            }
          />
          <Stack.Screen
            name={ScreenNames.RecommendationsList}
            component={Recommendations}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>,
  );

export default mockApp;
