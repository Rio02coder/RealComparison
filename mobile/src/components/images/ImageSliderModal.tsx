import React, {useEffect, useState} from 'react';
import appStyles from '../../styles/screens/Themes';
import ImageSliderModalProps from '../../types/components/images/ImageSliderModal';
import {SCROLL_THRESHOLD} from '../../types/Screen';
import CommonModal from '../Modal';
import ImageScroller from './ImageScroller';
import {ImageRequireSource} from 'react-native';

const ImageSliderModal = (props: ImageSliderModalProps) => {
  const [nonEmptyData, setNonEmptyData] = useState<(string | ImageRequireSource)[]
  >([]);
  const [enlarged, setEnlarged] = useState(false);
  const [showHelper, setShowHelper] = useState(true);

  const getDefaultData = (): ImageRequireSource =>
    require('../../assets/no_image.png');

  const isProvidedDataEmpty = () => props.data.length === 0;

  const handlePossiblyEmptyProvidedData = async () => {
    if (!isProvidedDataEmpty()) {
      setNonEmptyData(() => props.data);
      return;
    }
    setNonEmptyData([getDefaultData()]);
  };

  const initiateEnlargement = () => {
    setEnlarged(true);
    setShowHelper(false);
  };

  const endEnlargement = () => {
    setEnlarged(false);
    setShowHelper(true);
  };

  useEffect(() => {
    handlePossiblyEmptyProvidedData();
  }, [props.data]);

  return (
    <CommonModal
      style={props.styles?.container}
      color={appStyles.mainAppTheme.backgroundColor}
      swipeThreshold={SCROLL_THRESHOLD}
      coverScreen={props.coverScreen}
      onPress={{
        onEnter: initiateEnlargement,
        onExit: endEnlargement,
      }}>
      <ImageScroller
        data={nonEmptyData}
        animated={true}
        style={enlarged ? undefined : props.styles?.preview}
        helper={showHelper}
        remove={props.remove}
      />
    </CommonModal>
  );
};

export default ImageSliderModal;
