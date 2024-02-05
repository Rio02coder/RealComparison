import React, {ReactNode} from 'react';
import RBSheet from 'react-native-raw-bottom-sheet';

type BottomSheetProps = {
  children: ReactNode;
  elementToClickOn: ReactNode;
  height: number;
  onClose?: RBSheet['props']['onClose'];
  onOpen?: RBSheet['props']['onOpen'];
  isOpened?: boolean;
};

export default BottomSheetProps;
