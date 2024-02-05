import {StyleSheet} from 'react-native';
import {hp, wp} from '../../../types/Screen';

const styles = StyleSheet.create({
  container: {
    width: wp(40),
    height: hp(4.5),
    backgroundColor: '#6A5ECA',
    alignSelf: 'center',
    borderRadius: 40,
    alignItems: 'center',
    justifyContent: 'center',
    shadowOffset: {
      width: 10,
      height: 10,
    },
    shadowColor: 'black',
    shadowRadius: 10,
    shadowOpacity: 0.3,
  },
  text: {
    fontFamily: 'HelveticaNeue',
    fontSize: 15,
    fontWeight: '800',
    fontStyle: 'normal',
    lineHeight: 18,
    letterSpacing: 0,
    textAlign: 'left',
    color: 'white',
    alignSelf: 'center',
  },
});

export default styles;
