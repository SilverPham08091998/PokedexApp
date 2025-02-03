import React from "react";
import { StyleSheet, View } from "react-native";
import { RectButton } from "react-native-gesture-handler";
import { GET_COLORS, SVG_URL } from "@/theme";
import { scale } from "react-native-utils-scale";

type AddButtonProps = {
  onPress: () => void;
  tabWidth?: number;
  type?: string;
};

export const AddButton: React.FC<AddButtonProps> = ({ onPress }) => {
  return (
    <View style={styles.container}>
      <RectButton
        style={styles.button}
        onPress={onPress}
        rippleColor={GET_COLORS().PRIMARY}
      >
        <SVG_URL.IconPlus />
      </RectButton>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "relative",
    alignItems: "center",
    backgroundColor: GET_COLORS().TRANSPARENT,
  },

  button: {
    backgroundColor: GET_COLORS().PRIMARY,
    justifyContent: "center",
    alignItems: "center",
    width: scale(60),
    height: scale(60),
    borderRadius: scale(30),
    zIndex: 2,
    position: "absolute",
    bottom: scale(-32),
  },
});
