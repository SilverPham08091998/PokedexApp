import React from "react";
import { StyleSheet, TouchableOpacity, ViewStyle } from "react-native";
import { UIActivityIndicator } from "react-native-indicators";
import { fontScale, scale } from "react-native-utils-scale";
import { CText } from "..";
import { GET_COLORS } from "@/theme";

interface Props {
  title?: string;
  textColor?: string;
  backgroundColor?: string;
  fontSize?: number | any;
  onPress: () => void;
  disabled?: boolean;
  loading?: boolean;
  containerStyle?: ViewStyle;
}

const defaultProps = {
  backgroundColor: "",
  textColor: "",
  fontSize: null,
  onPress: () => null,
  disabled: false,
};
const CButton: React.FC<Props> = (props) => {
  const {
    fontSize,
    backgroundColor,
    textColor,
    title,
    onPress,
    disabled,
    loading,
    containerStyle,
  } = props;

  return (
    <TouchableOpacity
      disabled={disabled || loading}
      onPress={() => onPress()}
      style={[
        styles.container,
        {
          backgroundColor: disabled
            ? GET_COLORS().BLACK_4
            : backgroundColor
            ? backgroundColor
            : GET_COLORS().PRIMARY,
        },
        containerStyle,
      ]}
    >
      {loading ? (
        <UIActivityIndicator color="white" size={scale(24)} />
      ) : (
        <CText
          style={[
            styles.text,
            { color: textColor === "" ? GET_COLORS().WHITE : textColor },
            fontSize && { fontSize: fontScale(fontSize) },
          ]}
        >
          {title}
        </CText>
      )}
    </TouchableOpacity>
  );
};

CButton.defaultProps = defaultProps;

export default React.memo(CButton);

const styles = StyleSheet.create({
  container: {
    height: scale(50),
    borderRadius: scale(8),
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
  },
  shadowViewAnimation: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
    backgroundColor: GET_COLORS().WHITE,
  },
  text: {
    color: "white",
    fontSize: fontScale(16),
    textAlign: "center",
    fontWeight: "bold",
  },
});
