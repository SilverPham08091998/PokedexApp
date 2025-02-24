import React from "react";
import { StyleSheet, View, ViewStyle } from "react-native";
import { CText } from "@/components";
import { COLORS_LIGHT, rgba } from "@/theme";
import { scale } from "react-native-utils-scale";
import {
  MOVE,
  WIDTH_ACC,
  WIDTH_CAT,
  WIDTH_POWER,
  WIDTH_PP,
  WIDTH_TM_LV,
} from "@/components/Pokemon/PokemonMove";

interface Props {
  moveLearntBy: "LEVEL-UP" | "TUTOR" | "MACHINE" | "EGG";
  headerContainerStyle?: ViewStyle;
}

const HeaderMove: React.FC<Props> = (props) => {
  const { moveLearntBy, headerContainerStyle } = props;
  return (
    <View style={{ ...styles.headerContainer, ...headerContainerStyle }}>
      <CText
        fontSize={14}
        fontWeight={"bold"}
        style={headerColumnStyle(WIDTH_TM_LV, COLORS_LIGHT.RED)}
      >
        {moveLearntBy === MOVE.LEVEL_UP
          ? "Lv."
          : moveLearntBy === MOVE.MACHINE
          ? "TM."
          : ""}
      </CText>

      <CText
        fontSize={16}
        fontWeight={"bold"}
        style={{
          ...headerColumnStyle(0, COLORS_LIGHT.PRIMARY_LIGHT),
          flex: 1,
          paddingHorizontal: scale(4),
        }}
      >
        {"Move & Type"}
      </CText>
      <CText
        fontSize={14}
        textAlign={"center"}
        fontWeight={"bold"}
        style={headerColumnStyle(WIDTH_CAT, COLORS_LIGHT.RED)}
      >
        {"Cat."}
      </CText>
      <CText
        fontSize={14}
        textAlign={"center"}
        fontWeight={"bold"}
        style={headerColumnStyle(WIDTH_POWER, COLORS_LIGHT.PRIMARY_LIGHT)}
      >
        {"Power"}
      </CText>
      <CText
        fontSize={14}
        textAlign={"center"}
        fontWeight={"bold"}
        style={headerColumnStyle(WIDTH_ACC, COLORS_LIGHT.RED)}
      >
        {"Acc."}
      </CText>
      <CText
        fontSize={14}
        textAlign={"center"}
        fontWeight={"bold"}
        style={headerColumnStyle(WIDTH_PP, COLORS_LIGHT.PRIMARY_LIGHT)}
      >
        {"PP"}
      </CText>
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: "row",
    paddingVertical: scale(12),
  },
});

const headerColumnStyle = (width: number, color: string): ViewStyle => ({
  backgroundColor: rgba(color, 0.1),
  justifyContent: "center",
  width: scale(width),
  height: scale(40),
});

export default React.memo(HeaderMove);
