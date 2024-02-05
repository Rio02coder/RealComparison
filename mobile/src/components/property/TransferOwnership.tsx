import React, {createContext, useState} from 'react';
import {View, Text} from 'react-native';
import TransferOwnershipProps from '../../types/components/property/TransferOwnership';
import submitButtonStyles from '../../styles/defaults/buttons/Submit';
import BottomSheet from '../BottomSheet';
import {hp, SCROLL_THRESHOLD} from '../../types/Screen';
import UserSearchBar from '../search/UserBar';
import TransferOwnershipContext from '../../types/components/property/TransferOwnershipContext';

export const getTransferOwnershipButton = () => {
  return (
    <View style={[submitButtonStyles.container, {width: 180, height: 50}]}>
      <Text
        style={[submitButtonStyles.text, {fontWeight: 'bold', fontSize: 17}]}>
        Transfer Ownership
      </Text>
    </View>
  );
};

export const TransferOwnershipButtonContext =
  createContext<TransferOwnershipContext>({
    shouldTransfer: false,
    setShouldTransfer: () => {},
  });

const TransferOwnership = (props: TransferOwnershipProps) => {
  const [isOpened, setOpened] = useState<boolean>(false);
  const [shouldTransfer, setShouldTransfer] = useState<boolean>(false);
  return (
    <TransferOwnershipButtonContext.Provider
      value={{
        shouldTransfer: shouldTransfer,
        setShouldTransfer: setShouldTransfer,
      }}>
      <BottomSheet
        elementToClickOn={getTransferOwnershipButton()}
        height={hp(40)}
        isOpened={isOpened}
        onOpen={() => setOpened(true)}>
        <UserSearchBar
          reduxProps={props.reduxProps}
          property={props.property}
          setOpened={(value: boolean) => setOpened(value)}
        />
      </BottomSheet>
    </TransferOwnershipButtonContext.Provider>
    // <CommonModal
    //   color={appStyles.mainAppTheme.backgroundColor}
    //   swipeThreshold={SCROLL_THRESHOLD}
    //   elementToShow={
    //     <UserSearchBar
    //       reduxProps={props.reduxProps}
    //       property={props.property}
    //     />
    //   }>
    //   {getTransferOwnershipButton()}
    // </CommonModal>
  );
};

export default TransferOwnership;
