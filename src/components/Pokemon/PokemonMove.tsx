import { MoveInfo, PokemonMove } from "@/type/Move";
import { VersionGroupDetail } from "@/type/PokemonInfo";
import { PokemonTypeColors } from "@/type";
import {
  FlatList,
  StyleSheet,
  TouchableOpacity,
  View,
  ViewStyle,
} from "react-native";
import { scale } from "react-native-utils-scale";
import { CText } from "@/components";
import { COLORS_LIGHT, GET_COLORS, rgba } from "@/theme";
import { STRING_CONVERTER } from "@/util/function";
import React, { useMemo } from "react";
import { EmptyList } from "@/components/Pagination";
import { NAVIGATION, SCREEN_NAME, useAppDispatch } from "@/util";
import { ReduxAction } from "@/redux";

interface Props {
  currentVersion: string;
  moves: Array<PokemonMove>;
  title: string;
  moveLearntBy: "LEVEL-UP" | "TUTOR" | "MACHINE" | "EGG";
  version_group_details?: VersionGroupDetail[];
  onPressMove?: (move: MoveInfo) => void;
}

enum MOVE {
  LEVEL_UP = "LEVEL-UP",
  TUTOR = "TUTOR",
  MACHINE = "MACHINE",
  EGG = "EGG",
}

const WIDTH_CAT = 100;
const WIDTH_POWER = 50;
const WIDTH_ACC = 35;
const WIDTH_PP = 35;
const WIDTH_TM_LV = 50;

const CPokemonMove: React.FC<Props> = (props) => {
  const { currentVersion, moves, moveLearntBy, title, onPressMove } = props;
  const dispatch = useAppDispatch();

  const renderMoveItem = (
    move: MoveInfo,
    versionGroup: VersionGroupDetail[],
    moveLearntBy: string
  ) => {
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

  const movesData = useMemo<Array<PokemonMove>>(() => {
    if (currentVersion === "") {
      return moves;
    }
    let movesDataTemp = moves?.filter((move) =>
      move.version_group_details.some(
        (version) =>
          version.version_group.name.toUpperCase() === currentVersion &&
          version.move_learn_method.name.toUpperCase() === moveLearntBy
      )
    );
    if (moveLearntBy === MOVE.MACHINE) {
      movesDataTemp?.sort((move1, move2) => move1.move.id - move2.move.id);
    }
    if (moveLearntBy === MOVE.LEVEL_UP) {
      movesDataTemp?.sort((moveFirst, moveSecond) => {
        const levelUpMoveFirst =
          moveFirst?.version_group_details?.find(
            (i) => i.version_group.name.toUpperCase() === currentVersion
          )?.level_learned_at || 0;
        const levelUpMoveSecond =
          moveSecond?.version_group_details.find(
            (i) => i.version_group.name.toUpperCase() === currentVersion
          )?.level_learned_at || 0;

        return levelUpMoveFirst - levelUpMoveSecond;
      });
    }
    return movesDataTemp;
  }, [currentVersion]);

  const renderHeader = () => {
    return (
      <View style={styles.headerContainer}>
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
  return (
    <View style={styles.container}>
      {title && (
        <CText
          fontSize={18}
          fontWeight={"bold"}
          style={{ alignSelf: "center" }}
        >
          {title}
        </CText>
      )}
      <FlatList
        scrollEnabled={false}
        data={movesData}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => {
          return renderMoveItem(
            item.move,
            item.version_group_details,
            moveLearntBy
          );
        }}
        ItemSeparatorComponent={() => <View style={{ height: scale(8) }} />}
        ListHeaderComponent={renderHeader}
        ListFooterComponent={() => <View style={{ height: scale(8) }} />}
        ListEmptyComponent={<EmptyList />}
      />
    </View>
  );
};

export default React.memo(CPokemonMove);

const styles = StyleSheet.create({
  container: { flex: 1, marginBottom: scale(12) },
  headerContainer: {
    flexDirection: "row",
    paddingVertical: scale(12),
  },
  itemContainer: { flexDirection: "row", paddingVertical: scale(2) },
});

const headerColumnStyle = (width: number, color: string): ViewStyle => ({
  backgroundColor: rgba(color, 0.1),
  justifyContent: "center",
  width: scale(width),
  height: scale(40),
});
