import {StyleSheet} from 'react-native';
import appStyles from '../screens/Themes';

const BottomSheetStyles = StyleSheet.create({
  draggableIcon: {
    backgroundColor: '#E10032',
  },
  container: {
    backgroundColor: appStyles.mainAppTheme.backgroundColor,
    shadowOffset: {
      width: 10,
      height: 10,
    },
    shadowColor: 'black',
    shadowRadius: 10,
    shadowOpacity: 0.3,
  },
});

export default BottomSheetStyles;
