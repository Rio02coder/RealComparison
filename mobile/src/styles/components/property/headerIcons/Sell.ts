import {Platform, StyleSheet} from 'react-native';

const SellIconStyle = StyleSheet.create({
  Icon: {
    color: 'white',
    marginTop: Platform.OS === 'ios' ? 47.5 : 36,
    marginRight: 14,
  },
});

export default SellIconStyle;
