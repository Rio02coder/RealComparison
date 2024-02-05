import {StyleSheet} from 'react-native';
import appStyles from '../../../screens/Themes';

const stringFilterStyle = StyleSheet.create({
  dropdown: {
    height: 30,
    width: 250,
    borderColor: 'gray',
    borderWidth: 0.5,
    borderRadius: 8,
    paddingHorizontal: 8,
  },
  placeHolder: {
    color: 'white',
  },
  container: {
    backgroundColor: appStyles.mainAppTheme.backgroundColor,
    borderColor: 'gray',
    borderWidth: 0.5,
    borderRadius: 10,
  },
});

export default stringFilterStyle;
