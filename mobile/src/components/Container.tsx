import React from 'react';
import {KeyboardAvoidingView, Platform, View} from 'react-native';
import appStyles from '../styles/screens/Themes';
import ContainerProps from '../types/components/Container';

const FormContainer: React.FC<ContainerProps> = props =>
  Platform.OS === 'ios' ? (
    <KeyboardAvoidingView
      testID="form_container"
      behavior={'height'}
      style={[appStyles.authenticationScreenTheme, props.style]}>
      {props.children}
    </KeyboardAvoidingView>
  ) : (
    <View
      testID="form_container"
      style={[appStyles.authenticationScreenTheme, props.style]}>
      {props.children}
    </View>
  );

export default FormContainer;
