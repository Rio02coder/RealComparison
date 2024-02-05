import {StyleSheet} from 'react-native';
import ModalProps from '../../types/components/Modal';
import {HEIGHT, WIDTH} from '../../types/Screen';

const modalStyles = (props: ModalProps) =>
  StyleSheet.create({
    modal: {
      width: WIDTH,
      height: HEIGHT,
      backgroundColor: props.color,
      marginLeft: 0,
      marginVertical: 0,
    },
  });

export default modalStyles;
