import {Platform, StyleSheet} from 'react-native';

const BackIconStyles = StyleSheet.create({
  Icon: {
    color: 'white',
    marginTop: Platform.OS === 'ios' ? 42 : 30,
  },
});

export default BackIconStyles;
