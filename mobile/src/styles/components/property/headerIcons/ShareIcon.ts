import {Platform, StyleSheet} from 'react-native';

const ShareIconStyles = StyleSheet.create({
  Icon: {
    color: 'white',
    marginTop: Platform.OS === 'ios' ? 45.5 : 36,
    marginRight: 5,
  },
});

export default ShareIconStyles;