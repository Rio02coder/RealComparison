import {Platform} from 'react-native';

const FavouriteIconStyle = {
  Icon: {
    color: 'white',
    marginTop: Platform.OS === 'ios' ? 44.5 : 36,
    marginRight: 7,
  },
  selectedIcon: {
    color: 'white',
    marginTop: Platform.OS === 'ios' ? 47 : 39,
    marginRight: 14,
  }
};

export default FavouriteIconStyle;
