import {StyleSheet} from 'react-native';
import TitleProps from '../../types/components/Title';

const styles = (props: TitleProps) =>
  StyleSheet.create({
    title: {
      fontSize: props.size,
      color: '#fff',
      fontWeight: 'bold',
    },
    container: {
      position: props.absolute ? 'absolute' : 'relative',
      marginTop: props.top ? props.top : 0,
      alignSelf: props.flexDirection ? undefined : 'center',
      flexDirection: props.flexDirection ? props.flexDirection : 'column',
      zIndex: 10,
      bottom: props.bottom,
      marginLeft: props.left
    },
  });

export default styles;
