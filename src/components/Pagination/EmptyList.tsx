import { StyleProp, StyleSheet, View, ViewStyle } from "react-native";
import { CImage, CText } from "../index";
import React from "react";
import { GET_COLORS, IMAGE_URL } from "@/theme";
import { useTranslation } from "react-i18next";
import { scale } from "react-native-utils-scale";
import { ImageStyle } from "react-native-fast-image";

export interface EmptyListProps {
  title?: string;
  urlImage?: string;
  showImage?: boolean;
  imageStyle?: StyleProp<ImageStyle>;
  containerStyle?: StyleProp<ViewStyle>;
}

const EmptyList = (props: EmptyListProps) => {
  const { t } = useTranslation();
  const {
    title = t("common:emptyTitle"),
    urlImage = IMAGE_URL.avatar,
    showImage = false,
    imageStyle = {},
    containerStyle,
  } = props;
  return (
    <View style={[styles.container, containerStyle]}>
      {showImage && (
        <View style={{ marginVertical: scale(12) }}>
          <CImage
            style={[{ ...styles.image }, imageStyle]}
            url={urlImage}
            resizeMode={"contain"}
          />
        </View>
      )}
      <CText textAlign={"center"} color={GET_COLORS().BLACK_4} fontSize={14}>
        {title}
      </CText>
    </View>
  );
};

export default EmptyList;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: GET_COLORS().WHITE,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: scale(24),
  },
  image: {
    width: scale(50),
    height: scale(50),
  },
});
