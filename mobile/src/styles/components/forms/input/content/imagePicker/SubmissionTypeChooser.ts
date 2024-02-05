import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    zIndex: 1,
    position: 'absolute',
    right: 5,
    marginTop: 5,
    backgroundColor: 'rgba(42,42,42,0.5)',
    padding: 5,
    borderRadius: 20,
  },
  icon: {
    fontSize: 20,
    color: 'white',
  },
  footer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '60%',
    alignSelf: 'center',
  },
});

export default styles;
