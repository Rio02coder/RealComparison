import React, {useEffect} from 'react';
import BottomSheetProps from '../types/components/BottomSheet';
import RBSheet from 'react-native-raw-bottom-sheet';
import {useRef} from 'react';
import {TouchableOpacity} from 'react-native';
import BottomSheetStyles from '../styles/components/BottomSheet';

const BottomSheet: React.FC<BottomSheetProps> = props => {
  const refRBSheet = useRef<RBSheet>(null);

  const handleOpenRequest = () => {
    if (props.isOpened) {
      refRBSheet.current?.open();
      return;
    }
    refRBSheet.current?.close();
  };

  useEffect(handleOpenRequest, [props.isOpened]);

  return (
    <TouchableOpacity onPress={() => refRBSheet.current?.open()}>
      {props.elementToClickOn}
      <RBSheet
        onOpen={props.onOpen}
        onClose={props.onClose}
        height={props.height}
        ref={refRBSheet}
        closeOnDragDown={true}
        closeOnPressMask={true}
        customStyles={BottomSheetStyles}
        keyboardAvoidingViewEnabled={true}>
        {props.children}
      </RBSheet>
    </TouchableOpacity>
  );
};

export default BottomSheet;
