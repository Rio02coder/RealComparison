import {StyleSheet} from 'react-native';
import {hp, wp} from '../../../types/Screen';

const NavigationDrawerStyles = StyleSheet.create({
  container: {
    position: 'absolute',
    marginTop: 25,
    marginLeft: 17,
  },
  drawerButton: {
    marginLeft: 5,
    marginTop: hp(20),
    borderRadius: 50,
    width: wp(12.8),
    height: hp(5.95),
    shadowOffset: {
      width: 10,
      height: 10,
    },
    shadowColor: 'black',
    shadowRadius: 20,
    shadowOpacity: 0.7,
  },
  screenLink: {
    marginLeft: 6.5,
    marginTop: 20,
  },
  collapsibleContainer: {
    position: 'absolute',
  },
});

export default NavigationDrawerStyles;
