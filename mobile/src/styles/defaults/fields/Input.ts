import {Platform, StyleSheet} from 'react-native';
import InputProps, {
  InputType,
} from '../../../types/components/forms/input/Input';

const styles = <inputType extends InputType>(props: InputProps<inputType>) =>
  StyleSheet.create({
    container: {
      width: '80%',
      margin: Platform.OS === 'ios' ? 5 : 2.5,
      marginBottom: Platform.OS === 'ios' ? 10 : 5,
      alignSelf: 'center',
    },
    content: {
      flexDirection: props.label ? 'row' : undefined,
      justifyContent: 'space-between',
    },
  });

export default styles;
