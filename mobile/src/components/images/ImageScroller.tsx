import React, {useCallback, useRef, useState} from 'react';
import {FlatList, ImageRequireSource, ScrollViewProps} from 'react-native';
import ImageScrollerProps from '../../types/components/images/ImageScroller';
import DynamicImageComponent from './DynamicImage';

const ImageScroller: React.FC<ImageScrollerProps> = ({
  data,
  animated,
  style,
  remove,
  helper,
}) => {
  const [scrolledIndex, setScrolledIndex] = useState(0);
  const indexRef = useRef(scrolledIndex);
  indexRef.current = scrolledIndex;

  const previewList = React.createRef<FlatList<string | ImageRequireSource>>();

  const onScroll = useCallback<NonNullable<ScrollViewProps['onScroll']>>(
    event => {
      const slideSize = event.nativeEvent.layoutMeasurement.width;
      const currentIndex = event.nativeEvent.contentOffset.x / slideSize;
      const roundIndex = Math.round(currentIndex);
      const distance = Math.abs(roundIndex - currentIndex);
      const passedThreshold = distance <= 0.3; // make sure the sliding threshold is not too sensitive.
      if (roundIndex !== indexRef.current && passedThreshold) {
        setScrolledIndex(roundIndex);
      }
    },
    [],
  );

  const scrollToIndex = (indexToScrollTo: number) => {
    setScrolledIndex(indexToScrollTo);
    previewList.current?.scrollToIndex({
      index: indexToScrollTo,
      animated: true,
    });
  };

  const getMoveNext = (currentIndex: number): Function | null =>
    currentIndex >= data.length - 1
      ? null
      : () => scrollToIndex(currentIndex + 1);

  const getMoveBack = (currentIndex: number): Function | null =>
    currentIndex <= 0 ? null : () => scrollToIndex(currentIndex - 1);

  return (
    <FlatList
      data={data}
      ref={previewList}
      renderItem={({item, index}) => (
        <DynamicImageComponent
          uri={item}
          animated={animated}
          style={style}
          helper={helper}
          move={{
            next: getMoveNext(index),
            back: getMoveBack(index),
          }}
          remove={remove ? () => remove(index) : undefined}
        />
      )}
      keyExtractor={(item, id) => id.toString()}
      horizontal
      pagingEnabled={true}
      showsHorizontalScrollIndicator={false}
      onScroll={onScroll}
    />
  );
};

export default ImageScroller;
