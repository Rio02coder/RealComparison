import {Platform, StyleSheet, ViewStyle} from 'react-native';
import {hp, wp} from '../../../types/Screen';
import fieldInputStyles from '../fields/InputContent';
import InputProps, {
  InputType,
} from '../../../types/components/forms/input/Input';

const styles = (props: InputProps<InputType.PHONE>) => {
  const specificProps = props.props;
  const customViewStyles = specificProps?.styles?.container as ViewStyle;
  // const customTextStyle = specificProps?.styles?.text as TextStyle;
  return StyleSheet.create({
    container: {
      width: wp(63),
      height: hp(5.6),
      borderRadius: 40,
      backgroundColor: customViewStyles?.backgroundColor
        ? customViewStyles.backgroundColor
        : fieldInputStyles.input.backgroundColor,
      flexDirection: 'row',
      alignItems: 'center',
      shadowOffset: {
        width: 10,
        height: 10,
      },
      shadowColor: customViewStyles?.shadowColor
        ? customViewStyles.shadowColor
        : fieldInputStyles.input.shadowColor,
      shadowRadius: customViewStyles?.shadowRadius
        ? customViewStyles.shadowRadius
        : fieldInputStyles.input.shadowRadius,
      shadowOpacity: 0.3,
    },
    flagButtonView: {
      width: Platform.OS == 'ios' ? wp(13) : wp(14),
      height: '170%',
      minWidth: 32,
      justifyContent: 'center',
      marginLeft: Platform.OS == 'ios' ? 15 : 9,
      marginBottom: Platform.OS == 'android' ? 2 : 0,
      marginRight: Platform.OS == 'android' ? 1 : undefined,
      flexDirection: 'row',
      alignItems: 'center',
    },
    textContainer: {
      flex: 1,
      backgroundColor: customViewStyles?.backgroundColor
        ? customViewStyles.backgroundColor
        : fieldInputStyles.input.backgroundColor,
      paddingHorizontal: wp(2),
      paddingVertical: Platform.OS == 'ios' ? hp(1) : 0,
      marginTop: Platform.OS == 'ios' ? undefined : 3,
      borderRadius: 40,
      height: Platform.OS == 'ios' ? hp(4) : hp(5),
      textAlign: 'left',
      flexDirection: 'row',
      alignItems: 'center',
    },
    textInputStyle: {
      fontSize: 14,
      color: 'white',
      textAlign: 'left',
      paddingLeft: '5%',
    },
    codeText: {
      fontSize: 16,
      marginRight: Platform.OS == 'android' ? 2 : 7,
      marginBottom: Platform.OS == 'ios' ? 0 : 5.5,
      fontWeight: '700',
      color: '#42413f',
    },
  });
};

export default styles;
