import {StyleSheet} from 'react-native';
import appStyles from "../../screens/Themes";

const styles = StyleSheet.create({
  container: {
    backgroundColor: appStyles.mainAppTheme.backgroundColor,
    width: '80%',
    margin: 5,
    alignSelf: 'center',
    paddingTop: '20%',
    borderRadius: 20,
    height: '30%',
    marginTop: '25%',
  },
});

export default styles;
