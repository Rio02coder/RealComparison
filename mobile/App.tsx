import React from 'react';
import {StyleSheet} from 'react-native';
import {Provider} from 'react-redux';
import Navigator from './routes/NavigationStack';
import store from './src/redux/store';

// import mockStore from './test_utils/MockStore';

export default class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <Navigator />
      </Provider>
    );
  }
}

const styles = StyleSheet.create({
  //
});
