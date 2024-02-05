import React, {useContext, useEffect, useState} from 'react';
import {View, TouchableOpacity, Text} from 'react-native';
import UserBarProps from '../../types/search/User';
import {PasswordlessUserBackend} from '../../types/service/server';
import {retrieveAllUsers} from '../../service/Contactor/User';
import {tansferOwnedPropertyManager} from '../../utilities/property/OwnedPropertyManager';
import {PropertyScreenContext} from '../../screens/Property';
import {ScreenNames} from '../../types/ScreenNames';
import {SearchAutoCompleterProps} from '../../types/components/AutoCompleter';
import styles from '../../styles/defaults/fields/InputContent';
import {WIDTH} from '../../types/Screen';
import {
  getTransferOwnershipButton,
  TransferOwnershipButtonContext,
} from '../property/TransferOwnership';
import SuggestionItemProps from '../../types/components/search/SuggestionItem';
import User from './SuggestionItems/User';
import {searchTags} from '../../types/redux/Tags';

const UserBar = (props: UserBarProps) => {
  const {navigation, setProperty} = useContext(PropertyScreenContext);
  const {shouldTransfer, setShouldTransfer} = useContext(
    TransferOwnershipButtonContext,
  );
  const [userEmail, setUserEmail] = useState<string>('');
  const [allUsers, setAllUsers] = useState<PasswordlessUserBackend['user'][]>(
    [],
  );
  const handleTransfer = () => {
    if (!shouldTransfer || !userEmail) {
      return;
    }
    transfer(userEmail);
    setShouldTransfer(false);
  };
  const transfer = (input: string) => {
    tansferOwnedPropertyManager(
      props.property,
      props.reduxProps,
      setProperty,
      input,
    );
  };

  const revealSearcher = () => {
    props.setOpened(false);
    navigation?.navigate(ScreenNames.Search, {
      autoCompleter: {
        data: allUsers,
        stringify: userStringifier,
      } as SearchAutoCompleterProps<PasswordlessUserBackend['user']>,
      setInput: setUserEmail,
      initialInput: userEmail,
      search: () => {
        setShouldTransfer(true);
        navigation?.goBack();
        props.setOpened(true);
      },
      suggestionItem: (suggestionProps: SuggestionItemProps) => (
        <User {...suggestionProps} />
      ),
      searchAction: props.reduxProps.updateUserSearch,
      searchTag: searchTags.USER,
    });
  };

  useEffect(handleTransfer, [shouldTransfer]);
  useEffect(() => {
    shouldTransfer
      ? setUserEmail(props.reduxProps.search.get(searchTags.USER) as string)
      : setUserEmail('');
    retrieveAllUsers(props.reduxProps).then(response => setAllUsers(response));
  }, []);

  const userStringifier = (user: PasswordlessUserBackend['user']) => user.email;

  return (
    <View>
      <TouchableOpacity
        style={[
          styles.input,
          {width: WIDTH - 30, marginLeft: 15, marginTop: 3},
        ]}
        onPress={revealSearcher}>
        <Text style={[styles.text, {marginRight: 30}]}>{userEmail}</Text>
      </TouchableOpacity>
      <TouchableOpacity style={{marginTop: 20}} onPress={handleTransfer}>
        {getTransferOwnershipButton()}
      </TouchableOpacity>
    </View>
  );
};

export default UserBar;
