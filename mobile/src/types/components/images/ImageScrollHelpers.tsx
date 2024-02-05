import React from 'react';
import ImageScrollHelperProps from './ImageScrollHelper';
import {StyleProp, ViewStyle} from 'react-native';
import ImageScrollHelper from '../../../components/images/ImageScrollHelper';
import DynamicImageComponentProps from './DynamicImageComponent';

const ImageScrollHelpers: React.FC<{
  commonStyles: ImageScrollHelperProps['styles'];
  move: DynamicImageComponentProps['move'];
}> = ({commonStyles, move}) => {
  const getPositionedStyles = (
    alignedLeft: boolean = false,
  ): ImageScrollHelperProps['styles'] => {
    const aligningStyles = getAligningStyles(alignedLeft);
    return {
      container: commonStyles?.container
        ? {
            ...(commonStyles.container as object),
            ...(aligningStyles as object),
          }
        : aligningStyles,
      icon: commonStyles?.icon,
    };
  };

  const getAligningStyles = (
    alignedLeft: boolean = false,
  ): StyleProp<ViewStyle> => ({
    left: alignedLeft ? 6 : undefined,
    right: alignedLeft ? undefined : 6,
    bottom: 6,
  });

  return (
    <>
      <ImageScrollHelper
        move={move.back}
        icon={'chevron-circle-left'}
        styles={getPositionedStyles(true)}
      />
      <ImageScrollHelper
        move={move.next}
        icon={'chevron-circle-right'}
        styles={getPositionedStyles(false)}
      />
    </>
  );
};

export default ImageScrollHelpers;
