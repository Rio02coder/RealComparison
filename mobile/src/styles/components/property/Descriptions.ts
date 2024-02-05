import {StyleSheet} from 'react-native';

const propertyDescriptionStyles = StyleSheet.create({
  descriptionText: {
    color: '#b2b2b2',
    fontSize: 18,
    marginRight: 5
  },
  descriptionTitle: {
    color: '#d3d1d1',
    fontSize: 20,
    marginLeft: 5
  },
  descriptionContainer: {
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'space-between',
    marginBottom: 8
  },
  mainContainer: {
    flex: 1,
    marginTop: 20
  }
});

export default propertyDescriptionStyles;
