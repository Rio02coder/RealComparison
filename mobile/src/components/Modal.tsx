import React, {useState} from 'react';
import {TouchableOpacity, View} from 'react-native';
import ModalProps from '../types/components/Modal';
import Modal from 'react-native-modal';
import StylesWithoutProps from '../styles/components/Modal';

const CommonModal = (props: ModalProps) => {
  const styles = StylesWithoutProps(props);
  const [visible, setVisibility] = useState<boolean>(false);

  const handlePreviewEnter = () => {
    setVisibility(true);
    if (props.onPress?.onEnter) {
      props.onPress.onEnter();
    }
  };

  const handlePreviewExit = () => {
    setVisibility(false);
    if (props.onPress?.onExit) {
      props.onPress.onExit();
    }
  };

  return (
    <View>
      <TouchableOpacity onPress={handlePreviewEnter}>
        {props.children}
      </TouchableOpacity>
      <Modal
        testID="modal_component"
        isVisible={visible}
        style={[styles.modal, props.style]}
        swipeThreshold={props.swipeThreshold}
        onBackdropPress={handlePreviewExit}
        coverScreen={props.coverScreen}>
        <View style={{justifyContent: 'center', alignItems: 'center'}}>
          {props.elementToShow ? props.elementToShow : props.children}
        </View>
      </Modal>
    </View>
  );
};

export default CommonModal;
