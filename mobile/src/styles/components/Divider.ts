import {StyleSheet} from 'react-native';
import DividerProps from '../../types/components/Divider';

const styles = (props: DividerProps) => {
  const color = props.color ? props.color : '#827C7D';
  return StyleSheet.create({
    container: {
      marginTop: props.top,
      width: props.width,
      height: props.thickness,
      backgroundColor: color,
      alignSelf: 'center',
    },
    annotation: {
      fontFamily: 'HelveticaNeue',
      fontSize: 9,
      fontWeight: 'bold',
      color: color,
      position: 'absolute',
      alignSelf: 'center',
      marginTop: 5,
    },
  });
};

export default styles;
