import React, {useState} from 'react';
import OwnershipProps from '../../types/components/property/Ownership';
import {View} from 'react-native';
import {List} from 'react-native-paper';
import RequestOwnerShip from './RequestOwnerShip';
import ValidateOwnerButton from './ValidateOwner';
import DropOwnerShip from './DropOwnerShip';
import Icon from 'react-native-vector-icons/FontAwesome';
import Title from '../Title';
import appStyles from '../../styles/screens/Themes';
import PropertySection from './Section';
import styles from '../../styles/components/property/Ownership';
import TransferOwnership from './TransferOwnership';

const Ownership = (props: OwnershipProps) => {
  const [expanded, setExpanded] = useState(false);
  return (
    <PropertySection>
      <List.Accordion
        testID="expandable_list"
        title={
          <View>
            <Title
              title={'Ownership Status'}
              size={23}
              flexDirection={'row'}
              left={-16}
              top={-6}
            />
          </View>
        }
        right={({isExpanded}) => (
          <Icon
            name={isExpanded ? 'caret-up' : 'caret-down'}
            size={23}
            style={{marginTop: -14}}
            color={'white'}
          />
        )}
        expanded={expanded}
        onPress={() => setExpanded(!expanded)}
        style={appStyles.mainAppTheme}
        theme={{
          colors: {background: appStyles.mainAppTheme.backgroundColor},
          dark: false,
        }}>
        <View testID="ownershipView">
          {!props.is_owner ? (
            <View style={styles.container} testID="request_ownership">
              <RequestOwnerShip
                property={props.property}
                reduxProps={props.reduxProps}
              />
              <ValidateOwnerButton
                props={props.reduxProps}
                property={props.property}
              />
            </View>
          ) : (
            <View style={styles.container} testID="drop_ownership">
              <DropOwnerShip
                reduxProps={props.reduxProps}
                property={props.property}
              />
              <TransferOwnership
                reduxProps={props.reduxProps}
                property={props.property}
              />
            </View>
          )}
        </View>
      </List.Accordion>
    </PropertySection>
  );
};

export default Ownership;
