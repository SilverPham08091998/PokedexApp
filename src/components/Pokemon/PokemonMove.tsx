import { MoveInfo, PokemonMove } from "@/type/Move";
import { VersionGroupDetail } from "@/type/PokemonInfo";
import { FlatList, StyleSheet, View } from "react-native";
import { scale } from "react-native-utils-scale";
import { CText } from "@/components";
import React, { useMemo } from "react";
import { EmptyList } from "@/components/Pagination";
import MoveItem from "@/components/Pokemon/MoveItem";
import HeaderMove from "@/components/Pokemon/HeaderMove";

interface Props {
  currentVersion: string;
  moves: Array<PokemonMove>;
  title: string;
  moveLearntBy: "LEVEL-UP" | "TUTOR" | "MACHINE" | "EGG";
  version_group_details?: VersionGroupDetail[];
  onPressMove?: (move: MoveInfo) => void;
}

export enum MOVE {
  LEVEL_UP = "LEVEL-UP",
  TUTOR = "TUTOR",
  MACHINE = "MACHINE",
  EGG = "EGG",
}

export const WIDTH_CAT = 100;
export const WIDTH_POWER = 50;
export const WIDTH_ACC = 35;
export const WIDTH_PP = 35;
export const WIDTH_TM_LV = 50;

const CPokemonMove: React.FC<Props> = (props) => {
  const { currentVersion, moves, moveLearntBy, title, onPressMove } = props;

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
          return (
            <MoveItem
              move={item.move}
              moveLearntBy={moveLearntBy}
              currentVersion={currentVersion}
              versionGroup={item.version_group_details}
              onPressMove={onPressMove}
            />
          );
        }}
        ItemSeparatorComponent={() => <View style={{ height: scale(8) }} />}
        ListHeaderComponent={<HeaderMove moveLearntBy={moveLearntBy} />}
        ListFooterComponent={() => <View style={{ height: scale(8) }} />}
        ListEmptyComponent={<EmptyList />}
      />
    </View>
  );
};

export default React.memo(CPokemonMove);

const styles = StyleSheet.create({
  container: { flex: 1, marginBottom: scale(12) },
});
