import {StyleSheet} from 'react-native';
import appStyles from '../../../screens/Themes';

const styles = StyleSheet.create({
  defaultPreviewFormContainer: {
    paddingTop: undefined,
    height: undefined,
    marginTop: undefined,
    margin: undefined,
    backgroundColor: appStyles.mainAppTheme.backgroundColor,
  },
  defaultEditorFormContainer: {
    backgroundColor: appStyles.mainAppTheme.backgroundColor,
  },
});

export default styles;
