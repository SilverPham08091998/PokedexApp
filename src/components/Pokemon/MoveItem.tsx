import React from "react";
import { PokemonTypeColors } from "@/type";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { ReduxAction } from "@/redux";
import { NAVIGATION, SCREEN_NAME, useAppDispatch } from "@/util";
import { CText } from "@/components";
import { scale } from "react-native-utils-scale";
import { GET_COLORS, rgba } from "@/theme";
import { STRING_CONVERTER } from "@/util/function";
import { MoveInfo } from "@/type/Move";
import { VersionGroupDetail } from "@/type/PokemonInfo";
import {
  MOVE,
  WIDTH_ACC,
  WIDTH_CAT,
  WIDTH_POWER,
  WIDTH_PP,
  WIDTH_TM_LV,
} from "@/components/Pokemon/PokemonMove";

interface Props {
  move: MoveInfo;
  versionGroup: VersionGroupDetail[];
  moveLearntBy: "LEVEL-UP" | "TUTOR" | "MACHINE" | "EGG";
  currentVersion: string;
  onPressMove?: (move: MoveInfo) => void;
}

const MoveItem: React.FC<Props> = (props: Props) => {
  const { move, moveLearntBy, versionGroup, currentVersion, onPressMove } =
    props;
  const dispatch = useAppDispatch();

  const learnMethod = versionGroup.find(
    (i) =>
      i.version_group.name.toUpperCase() === currentVersion &&
      i.move_learn_method.name.toUpperCase() === moveLearntBy
  );
  const colorType = PokemonTypeColors[move.type.name.toUpperCase()];
  return (
    <TouchableOpacity
      style={styles.itemContainer}
      onPress={() => {
        if (onPressMove) {
          onPressMove(move);
        } else {
          dispatch(
            ReduxAction.HOME_ACTION.getMoveInfo(move, () => {
              NAVIGATION.navigate(
                SCREEN_NAME.POKEMON_INFO_STACK,
                SCREEN_NAME.MOVE_INFO
              );
            })
          );
        }
      }}
    >
      <CText
        fontSize={14}
        fontWeight={"bold"}
        color={colorType}
        textAlign={"center"}
        style={{ width: scale(WIDTH_TM_LV) }}
      >
        {moveLearntBy === MOVE.LEVEL_UP
          ? learnMethod?.level_learned_at
          : moveLearntBy === MOVE.MACHINE
          ? move.id
          : ""}
      </CText>
      <View style={{ flex: 1 }}>
        <CText
          distanceBottom={4}
          fontSize={16}
          fontWeight={"bold"}
          color={colorType}
        >
          {move.name}
        </CText>
        <View
          style={{
            backgroundColor: rgba(colorType, 0.6),
            alignItems: "center",
            justifyContent: "center",
            borderRadius: scale(6),
            width: scale(80),
            paddingVertical: scale(2),
          }}
        >
          <CText fontSize={12} fontWeight={"bold"} color={GET_COLORS().WHITE}>
            {`${move.type.name.toUpperCase()}`}
          </CText>
        </View>
      </View>
      <CText
        fontSize={14}
        textAlign={"center"}
        fontWeight={"bold"}
        style={{ width: scale(WIDTH_CAT) }}
      >
        {STRING_CONVERTER.upperCaseFirstChart(move.damage_class.name)}
      </CText>
      <CText
        fontSize={14}
        textAlign={"center"}
        fontWeight={"bold"}
        style={{ width: scale(WIDTH_POWER) }}
      >
        {move?.power || "--"}
      </CText>
      <CText
        fontSize={14}
        textAlign={"center"}
        fontWeight={"bold"}
        style={{ width: scale(WIDTH_ACC) }}
      >
        {move?.accuracy || "--"}
      </CText>
      <CText
        fontSize={14}
        textAlign={"center"}
        fontWeight={"bold"}
        style={{ width: scale(WIDTH_PP) }}
      >
        {move?.pp || "--"}
      </CText>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  itemContainer: { flexDirection: "row", paddingVertical: scale(2) },
});

export default React.memo(MoveItem);
