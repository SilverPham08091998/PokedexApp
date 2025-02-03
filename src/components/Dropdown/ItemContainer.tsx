import { StyleSheet, TouchableOpacity } from "react-native";
import { scale } from "react-native-utils-scale";
import { CText } from "@/components";
import { GET_COLORS } from "@/theme";
import { DEVICE_WIDTH } from "@/util/constants";
import Ionicons from "react-native-vector-icons/Ionicons";
import React from "react";
import { BaseOption } from "@/type";

export interface ItemContainerProps<T extends BaseOption> {
  item: T;
  onChooseItem: (item: T) => void;
  isSelected: boolean;
  onClearItem: (item: T) => void;
}

const ItemContainer: <T extends BaseOption>(
  props: ItemContainerProps<T>
) => React.ReactElement = <T extends BaseOption>(
  props: ItemContainerProps<T>
) => {
  const { item, isSelected, onChooseItem, onClearItem } = props;
  return (
    <TouchableOpacity
      activeOpacity={isSelected ? 1 : 0.2}
      onPress={() => {
        if (!isSelected) {
          onChooseItem(item);
        }
      }}
      style={{
        ...styles.container,
        backgroundColor: isSelected ? "rgba(16, 156, 241, 0.08)" : "#fff",
      }}
    >
      <CText
        bold={isSelected}
        fontSize={16}
        color={isSelected ? GET_COLORS().PRIMARY : GET_COLORS().BLACK_1}
        style={{
          width: DEVICE_WIDTH - scale(isSelected ? 96 : 72),
        }}
      >
        {item.label}
      </CText>
      {isSelected && (
        <TouchableOpacity
          onPress={() => {
            onClearItem(item);
          }}
        >
          <Ionicons
            name="close-circle"
            size={scale(20)}
            color={GET_COLORS().BLACK_2}
          />
        </TouchableOpacity>
      )}
    </TouchableOpacity>
  );
};
export default React.memo(ItemContainer) as typeof ItemContainer;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: scale(12),
    marginVertical: scale(3),
    borderRadius: scale(10),
    marginHorizontal: scale(24),
  },
});
