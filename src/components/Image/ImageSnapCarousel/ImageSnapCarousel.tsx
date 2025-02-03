import React, { useState } from "react";
import { StyleSheet, TouchableOpacity, View, ViewStyle } from "react-native";
import Carousel, { Pagination } from "react-native-snap-carousel";
import { scale } from "react-native-utils-scale";
import { CImage, CText } from "@/components";
import { DEVICE_WIDTH } from "@/util/constants";
import { COLORS_LIGHT, GET_COLORS } from "@/theme";
import { ImageStyle } from "react-native-fast-image";

interface ImageSnapCarouselProps<T> {
  containerStyle?: ViewStyle;
  imageStyle?: ImageStyle;
  itemContainerStyle?: ViewStyle;
  data: Array<T>;
  sliderWidth?: number;
  itemWidth?: number;
  renderItemCarousel?: (item: T) => React.ReactNode;
  renderPaginationCarousel?: (
    dotsLength: number,
    activeDotIndex: number
  ) => React.ReactNode;
  dotStyle?: ViewStyle | undefined;
  inactiveDotStyle?: ViewStyle | undefined;
  layouts?: "default" | "stack" | "tinder" | undefined;
  defaultFieldUrl?: string;
  disabledButton?: boolean;
  onPressImage?: (item: T) => void;
  sourceType?: "source" | "uri";
  absoluteStyle?: ViewStyle;
}

const ImageSnapCarousel: <T>(
  props: ImageSnapCarouselProps<T>
) => React.ReactElement = <T extends any>(props: ImageSnapCarouselProps<T>) => {
  const {
    containerStyle = {},
    imageStyle = {},
    itemContainerStyle = {},
    data = [],
    sliderWidth = DEVICE_WIDTH,
    itemWidth = DEVICE_WIDTH,
    renderItemCarousel,
    renderPaginationCarousel,
    dotStyle = {},
    inactiveDotStyle = {},
    layouts = "default",
    defaultFieldUrl = "image",
    disabledButton = true,
    onPressImage,
    sourceType = "source",
    absoluteStyle = {},
  } = props;
  const [indexSlide, setIndexSlide] = useState<number>(0);
  const renderItem = (item: T) => {
    if (renderItemCarousel) {
      renderItemCarousel(item);
    }
    const source =
      sourceType === "source"
        ? // @ts-ignore
          item[defaultFieldUrl]
        : // @ts-ignore
          { uri: item[defaultFieldUrl] };
    return (
      <TouchableOpacity
        disabled={disabledButton}
        onPress={() => onPressImage && onPressImage(item)}
        style={{ ...styles.itemContainerStyle, ...itemContainerStyle }}
      >
        <View>
          <CImage
            source={source}
            style={{ ...styles.image, ...imageStyle }}
            resizeMethod={"auto"}
            resizeMode={"cover"}
          />
          <View style={{ ...styles.viewAbsolute, ...absoluteStyle }}>
            <CText fontSize={10}>
              {indexSlide + 1}/{data.length}
            </CText>
          </View>
        </View>
      </TouchableOpacity>
    );
  };
  const renderPagination = (dotsLength: number, activeDotIndex: number) => {
    if (renderPaginationCarousel) {
      renderPaginationCarousel(dotsLength, activeDotIndex);
    }
    return (
      <Pagination
        dotsLength={dotsLength}
        activeDotIndex={activeDotIndex}
        containerStyle={{
          backgroundColor: COLORS_LIGHT.WHITE,
          paddingVertical: scale(16),
        }}
        dotStyle={[
          {
            width: scale(16),
            height: scale(2),
            backgroundColor: COLORS_LIGHT.PRIMARY,
            marginHorizontal: scale(-5),
          },
          dotStyle,
        ]}
        inactiveDotStyle={[
          {
            backgroundColor: "grey",
            width: scale(16),
            height: scale(2),
          },
          inactiveDotStyle,
        ]}
        inactiveDotOpacity={0.5}
        inactiveDotScale={1}
      />
    );
  };
  return (
    <View style={{ ...styles.container, ...containerStyle }}>
      <Carousel
        sliderWidth={sliderWidth}
        itemWidth={itemWidth}
        data={data}
        layout={layouts}
        renderItem={({ item }) => renderItem(item)}
        removeClippedSubviews={false}
        onSnapToItem={(slideIndex) => {
          setIndexSlide(slideIndex);
        }}
        activeSlideAlignment={"center"}
      />
      {renderPagination(data.length, indexSlide)}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
  image: {
    width: scale(DEVICE_WIDTH),
    height: scale(330),
  },
  itemContainerStyle: {
    borderRadius: scale(8),
    alignItems: "center",
  },
  viewAbsolute: {
    position: "absolute",
    right: scale(12),
    bottom: scale(12),
    backgroundColor: GET_COLORS().LINE_2,
    borderWidth: scale(1),
    borderRadius: scale(12),
    borderColor: GET_COLORS().BLACK_4,
    paddingVertical: scale(2),
    paddingHorizontal: scale(8),
  },
});

export default React.memo(ImageSnapCarousel) as <T>(
  props: ImageSnapCarouselProps<T>
) => React.ReactElement;
