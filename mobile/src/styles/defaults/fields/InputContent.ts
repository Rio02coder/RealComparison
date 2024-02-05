import {Platform, StyleSheet} from 'react-native';
import {wp} from '../../../types/Screen';

const styles = StyleSheet.create({
  text: {
    textAlign: 'center',
    flex: 1,
    color: 'white',
    paddingLeft: 10,
    paddingRight: 10,
  },
  input: {
    backgroundColor: '#6C7197',
    padding: Platform.OS === 'ios' ? 15 : 0,
    borderRadius: wp(100),
    color: '#1c1c1c',
    shadowOffset: {
      width: 10,
      height: 10,
    },
    shadowColor: 'black',
    shadowRadius: 10,
    shadowOpacity: Platform.OS === 'ios' ? 0.3 : 0.5,
    textAlign: 'center',
    elevation: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconContainer: {marginLeft: Platform.OS === 'android' ? 10 : undefined},
  icon: {
    marginRight: 5,
    fontSize: 20,
    color: '#A6BCD0',
  },
});

export default styles;
