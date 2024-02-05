import React from 'react';
import DynamicImageComponentProps from '../../types/components/images/DynamicImageComponent';
import ImageProps from '../../types/components/images/Image';
import AnimatedImageComponent from './AnimatedImage';
import ImageComponent from './Image';
import imageStyles from '../../styles/components/Image';
import ImageRemover from './ImageRemover';
import ImageScrollHelperProps from '../../types/components/images/ImageScrollHelper';
import ImageScrollHelpers from '../../types/components/images/ImageScrollHelpers';

const DynamicImageComponent: React.FC<DynamicImageComponentProps> = ({
  uri,
  style,
  animated,
  remove,
  helper,
  move,
}) => {
  const imageComponentProps: ImageProps = {
    source: typeof uri === 'number' ? uri : {uri: uri},
    style: style ? style : imageStyles.image,
  };

  const ChosenImageComponent = animated
    ? AnimatedImageComponent
    : ImageComponent;

  const helperStyles: ImageScrollHelperProps['styles'] = {
    container: {
      position: 'absolute',
      alignSelf: 'flex-end',
      right: 0,
    },
  };

  return (
    <>
      <ChosenImageComponent {...imageComponentProps} />
      {helper ? (
        <ImageScrollHelpers move={move} commonStyles={helperStyles} />
      ) : (
        remove && <ImageRemover styles={helperStyles} remove={remove} />
      )}
    </>
  );
};

export default DynamicImageComponent;
