import { StyleSheet, TouchableOpacity } from "react-native";
import { scale } from "react-native-utils-scale";
import Ionicons from "react-native-vector-icons/Ionicons";
import { GET_COLORS } from "@/theme";
import React from "react";

interface Props {
  disabled: boolean;
  onPressIcon: () => void;
}

const Chevron: React.FC<Props> = (props: Props) => {
  const { disabled, onPressIcon } = props;
  return (
    <TouchableOpacity
      style={styles.container}
      disabled={disabled}
      onPress={() => onPressIcon()}
    >
      <Ionicons
        name="chevron-down"
        size={scale(16)}
        color={disabled ? GET_COLORS().BLACK_4 : GET_COLORS().BLACK_2}
      />
    </TouchableOpacity>
  );
};
export default Chevron;

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    width: scale(30),
    height: scale(30),
    marginLeft: scale(24),
  },
});
