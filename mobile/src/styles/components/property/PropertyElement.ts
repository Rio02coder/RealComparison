import {Platform, StyleSheet} from 'react-native';
import PropertyElementProps from '../../../types/components/property/PropertyElement';
import appStyles from '../../screens/Themes';

const propertyElementStyles = (props: PropertyElementProps) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: appStyles.mainAppTheme.backgroundColor,
      height: props.containerHeight,
      width: props.containerWidth,
      borderRadius: 15,
      shadowOffset: {
        width: 10,
        height: 10,
      },
      shadowColor: 'black',
      shadowRadius: 18,
      shadowOpacity: 0.9,
      marginVertical: 10,
      marginHorizontal: Platform.OS === 'ios' ? 20 : 21,
      justifyContent: 'center',
    },
  });

export default propertyElementStyles;
