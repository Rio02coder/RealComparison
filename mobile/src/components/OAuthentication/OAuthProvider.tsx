/* istanbul ignore file */
import React from 'react';
import {TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import OAuthProviderProps from '../../types/components/OAuthentication/OAuthProvider';

const OAuthProvider: React.FC<OAuthProviderProps> = props => (
  <TouchableOpacity
    testID="oauth_provider"
    style={props.style?.container}
    onPress={async () => {
      const [pendingUserDataFetcher, burstCleanup] =
        await props.authenticator.authentify(props.setErrors);
      const user = await pendingUserDataFetcher;
      if (!user) {
        return;
      }
      await props.completeLoginProcess(user);
      burstCleanup();
    }}>
    <Icon
      style={[props.style?.icon, {marginLeft: 5, marginRight: 5}]}
      name={props.authenticator.icon}
      size={35}
    />
  </TouchableOpacity>
);

export default OAuthProvider;
