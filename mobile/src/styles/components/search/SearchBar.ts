import {Platform, StyleSheet} from 'react-native';
import SearchContext from '../../../types/components/screens/SearchContext';
import {WIDTH} from '../../../types/Screen';

const SearchBarStyles = (props: SearchContext) =>
  StyleSheet.create({
    buttonContainer: {
      opacity: 1,
      flexDirection: 'row',
      justifyContent: 'space-evenly',
      width: WIDTH,
    },
    mainContainer: {
      width: WIDTH,
      height: props.containerHeight,
      backgroundColor: 'rgba(8,26,40,0.95)',
      borderBottomLeftRadius: Platform.OS === 'ios' ? 20 : 25,
      borderBottomRightRadius: Platform.OS === 'ios' ? 20 : 25,
      position: 'absolute',
    },
    group: {justifyContent: 'space-around', flex: 1},
  });

export default SearchBarStyles;
