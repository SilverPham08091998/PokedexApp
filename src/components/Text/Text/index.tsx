import React from "react";
import { Text, TextStyle, TouchableOpacity, ViewStyle } from "react-native";
import { fontScale } from "react-native-utils-scale";
import Clipboard from "@react-native-community/clipboard";
import { GET_COLORS } from "@/theme";
import { ColorValue } from "react-native/Libraries/StyleSheet/StyleSheet";

export interface TextProps {
  fontSize?: number;
  bold?: boolean;
  color?: string;
  style?: ViewStyle;
  textStyle?: TextStyle | TextStyle[];
  numberOfLines?: number;
  touch?: boolean;
  onPress?: () => void;
  fontFamily?: string;
  lineHeight?: number;
  ellipseMode?: "head" | "middle" | "tail" | "clip";
  copy?: boolean;
  fontWeight?: "bold" | "normal" | "400" | "500" | "600" | "700";
  distanceBottom?: number;
  textAlign?: "auto" | "left" | "right" | "center" | "justify" | undefined;
  textDecorationLine?:
    | "none"
    | "underline"
    | "line-through"
    | "underline line-through"
    | undefined;
  textDecorationStyle?: "solid" | "double" | "dotted" | "dashed" | undefined;
  textDecorationColor?: ColorValue | undefined;
  distanceTop?: number;
}

const defaultProps = {
  style: {},
  fontSize: 14,
  bold: false,
  touch: false,
  color: GET_COLORS()?.BLACK_2,
  lineHeight: undefined,
  onPress: () => null,
  ellipseMode: undefined,
  copy: false,
};

const copyText = (content: string) => {
  Clipboard.setString(content);
};

const TextComponent: React.FC<React.PropsWithChildren<TextProps>> = (props) => {
  const {
    touch,
    numberOfLines,
    onPress,
    fontSize = 14,
    color,
    style,
    children,
    lineHeight,
    ellipseMode,
    copy,
    fontWeight = "500",
    distanceBottom = 0,
    textDecorationLine = undefined,
    textDecorationStyle = undefined,
    textAlign = "left",
    textDecorationColor = undefined,
    fontFamily = undefined,
    distanceTop = 0,
    textStyle,
  } = props;

  return (
    <TouchableOpacity
      onPress={() => (copy ? copyText(`${children}`) : onPress && onPress())}
      style={{ ...style }}
      disabled={touch}
      activeOpacity={1}
    >
      <Text
        ellipsizeMode={ellipseMode}
        style={[
          {
            fontSize: fontScale(fontSize),
            color: color,
            lineHeight: lineHeight ? lineHeight : undefined,
            fontWeight: fontWeight,
            marginBottom: distanceBottom,
            textDecorationLine: textDecorationLine,
            textAlign: textAlign,
            textDecorationColor: textDecorationColor,
            fontFamily: fontFamily,
            textDecorationStyle: textDecorationStyle,
            marginTop: distanceTop,
          },
          textStyle,
        ]}
        numberOfLines={numberOfLines}
      >
        {children}
      </Text>
    </TouchableOpacity>
  );
};

TextComponent.defaultProps = defaultProps;

export default TextComponent;
