import {StyleSheet} from 'react-native';
import ButtonProps from '../../../types/components/buttons/Link';
import {hp, wp} from '../../../types/Screen';

const styles = (props: ButtonProps) =>
  StyleSheet.create({
    container: {
      marginTop: hp(props.marginTop),
      position: 'absolute',
      borderRadius: 40,
      backgroundColor: '#6A5ECA',
      width: props.width ? props.width : wp(30.5),
      height: props.height ? props.height : hp(3),
      alignSelf: 'center',
      justifyContent: 'center',
      shadowOffset: {
        width: 10,
        height: 10,
      },
      shadowColor: 'black',
      shadowRadius: 10,
      shadowOpacity: 0.3,
    },
    title: {
      fontFamily: 'HelveticaNeue',
      fontSize: 14,
      fontWeight: 'bold',
      lineHeight: 13,
      textAlign: 'center',
      color: 'white',
    },
  });

export default styles;
