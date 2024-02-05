import {StyleSheet} from 'react-native';

const sellingInfoStyles = StyleSheet.create({
  container: {
    marginTop: 8,
    marginBottom: 5,
    justifyContent: 'center',
    shadowOffset: {
      width: 15,
      height: 15,
    },
    shadowColor: 'black',
    shadowRadius: 30,
    shadowOpacity: 0.5,
  },
  text: {
    fontWeight: '500',
    color: 'white',
    fontSize: 23,
  },
});

export default sellingInfoStyles;