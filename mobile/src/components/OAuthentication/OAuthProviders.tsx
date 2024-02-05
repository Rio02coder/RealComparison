/* istanbul ignore file */
import React, {useState} from 'react';
import {Text, View} from 'react-native';
import {FormErrors} from '../../types/components/forms/FormContext';
import OAuthProvidersProps from '../../types/components/OAuthentication/OAuthProviders';
import OAuthProvider from './OAuthProvider';
import errorNoteStyles from '../../styles/defaults/fields/ErrorNote';
import OAuthenticator from '../../utilities/authentication/OAuthenticator';
import UnsplashAuthenticator from '../../utilities/authentication/UnsplashAuthenticator';

OAuthenticator.getAuthenticatorsChain().push([
  new UnsplashAuthenticator(),
  UnsplashAuthenticator,
]);

const OAuthProviders: React.FC<OAuthProvidersProps> = props => {
  const [errors, setErrors] = useState<FormErrors<{}>>({});
  return (
    <>
      <View
        testID="oauth_parent"
        style={[props.containerStyle, {flexDirection: 'row'}]}>
        {OAuthenticator.getAuthenticatorsChain().map(authenticator => (
          <OAuthProvider
            style={props.providerStyle}
            key={authenticator[0].name}
            authenticator={authenticator[0]}
            setErrors={setErrors}
            {...props}
          />
        ))}
      </View>
      {errors.default && (
        <Text style={errorNoteStyles.error}>{errors.default}</Text>
      )}
    </>
  );
};

export default OAuthProviders;
