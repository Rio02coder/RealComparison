import React, {useState} from 'react';
import {TouchableOpacity, View} from 'react-native';
import Collapsible from 'react-native-collapsible';
import Icon from 'react-native-vector-icons/Ionicons';
import NavigationDrawerStyles from '../../styles/components/AppNavigation/NavigationDrawer';
import NavigationDrawerProps from '../../types/components/AppNavigation/NavigationDrawer';
import {navigationData} from '../../types/components/AppNavigation/ScreenLink';
import defaultFeeder from '../../utilities/navigation/defaultFeeder';
import ScreenLink from './ScreenLink';

const NavigationDrawer: React.FC<NavigationDrawerProps> = props => {
  const [collapsed, setCollapsed] = useState<boolean>(true);
  return (
    <View testID="Navigation" style={NavigationDrawerStyles.container}>
      <TouchableOpacity
        style={NavigationDrawerStyles.drawerButton}
        onPress={() => setCollapsed(!collapsed)}>
        <Icon
          name={
            collapsed
              ? 'ellipsis-vertical-circle-sharp'
              : 'ellipsis-horizontal-circle-sharp'
          }
          color={'white'}
          size={50}
        />
      </TouchableOpacity>
      <Collapsible
        collapsed={collapsed}
        align="center"
        style={NavigationDrawerStyles.collapsibleContainer}>
        {navigationData.map(navigationInfo => (
          <ScreenLink
            payload={(props.feeder ? props.feeder : defaultFeeder)(
              navigationInfo[1],
            )}
            navigation={props.navigation}
            nextScreen={navigationInfo[1]}
            icon={navigationInfo[0].IconName}
            key={navigationInfo[0].IconName}
            iconSize={navigationInfo[0].IconSize}
            style={navigationInfo[0]?.style}
          />
        ))}
      </Collapsible>
    </View>
  );
};

export default NavigationDrawer;
