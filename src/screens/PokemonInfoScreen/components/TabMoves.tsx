import React, { useEffect, useState } from "react";
import {
  FlatList,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import { CModal, CText } from "@/components";
import { DEVICE_WIDTH, useAppSelector } from "@/util";
import FloatingActionGroups from "@/screens/PokemonInfoScreen/components/FloatingActionButton";
import { COLORS_LIGHT, GET_COLORS, rgba } from "@/theme";
import { scale } from "react-native-utils-scale";
import { STRING_CONVERTER } from "@/util/function";
import { PokemonTypeColors, PokemonVersionColors } from "@/type";
import { MORE_ITEM } from "@/screens/PokemonInfoScreen/constants";
import { MoveInfo } from "@/type/Move";
import { VersionGroupDetail } from "@/type/PokemonInfo";

interface Props {}

enum MOVE {
  LEVEL_UP = "LEVEL-UP",
  TUTOR = "TUTOR",
  MACHINE = "MACHINE",
  EGG = "EGG",
}

const TabMoves: React.FC<Props> = () => {
  const { versions } = useAppSelector((state) => {
    return state.home;
  });
  const { moves } = useAppSelector((state) => {
    return state.home.pokemonInfo;
  });
  const [isShow, setIsShow] = useState<boolean>(false);
  const [currentVersion, setCurrentVersion] = useState<string>("");

  useEffect(() => {
    if (versions && versions.length > 1) {
      setCurrentVersion(versions[0].name);
    }
  }, []);

  const renderMoveItem = (
    move: MoveInfo,
    versionGroup: VersionGroupDetail[],
    moveLearntBy: MOVE
  ) => {
    const learnMethod = versionGroup.find(
      (i) => i.version_group.name.toUpperCase() === currentVersion
    );
    const colorType = PokemonTypeColors[move.type.name.toUpperCase()];
    return (
      <View style={{ flexDirection: "row", paddingVertical: scale(2) }}>
        <CText
          fontSize={14}
          fontWeight={"bold"}
          color={colorType}
          textAlign={"center"}
          style={{ width: scale(50) }}
        >
          {learnMethod?.level_learned_at}
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
          style={{ width: scale(80) }}
        >
          {STRING_CONVERTER.upperCaseFirstChart(move.damage_class.name)}
        </CText>
        <CText
          fontSize={14}
          textAlign={"center"}
          fontWeight={"bold"}
          style={{ width: scale(50) }}
        >
          {move?.power || "--"}
        </CText>
        <CText
          fontSize={14}
          textAlign={"center"}
          fontWeight={"bold"}
          style={{ width: scale(35) }}
        >
          {move?.accuracy || "--"}
        </CText>
        <CText
          fontSize={14}
          textAlign={"center"}
          fontWeight={"bold"}
          style={{ width: scale(35) }}
        >
          {move?.pp || "--"}
        </CText>
      </View>
    );
  };

  const renderMove = (moveLearntBy: MOVE, title?: string) => {
    return (
      <View style={{ flex: 1 }}>
        <CText
          fontSize={18}
          fontWeight={"bold"}
          style={{ alignSelf: "center" }}
        >
          {title || "Moves learnt by level up"}
        </CText>
        <FlatList
          scrollEnabled={false}
          data={moves?.filter((move) =>
            move.version_group_details.some(
              (version) =>
                version.version_group.name.toUpperCase() === currentVersion &&
                version.move_learn_method.name.toUpperCase() === moveLearntBy
            )
          )}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => {
            return renderMoveItem(
              item.move,
              item.version_group_details,
              MOVE.LEVEL_UP
            );
          }}
          ItemSeparatorComponent={() => <View style={{ height: scale(8) }} />}
          ListHeaderComponent={() => (
            <View
              style={{
                flexDirection: "row",
                paddingVertical: scale(12),
              }}
            >
              <CText
                fontSize={14}
                fontWeight={"bold"}
                style={{
                  width: scale(50),
                  backgroundColor: rgba(COLORS_LIGHT.RED, 0.1),
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                {"Lv."}
              </CText>

              <CText
                fontSize={16}
                fontWeight={"bold"}
                style={{
                  height: scale(30),
                  backgroundColor: rgba(COLORS_LIGHT.PRIMARY, 0.1),
                  justifyContent: "center",
                  flex: 1,
                }}
              >
                {"Move & Type"}
              </CText>
              <CText
                fontSize={14}
                textAlign={"center"}
                fontWeight={"bold"}
                style={{
                  width: scale(80),
                  height: scale(30),
                  backgroundColor: rgba(COLORS_LIGHT.RED, 0.1),
                  justifyContent: "center",
                }}
              >
                {"Cat."}
              </CText>
              <CText
                fontSize={14}
                textAlign={"center"}
                fontWeight={"bold"}
                style={{
                  width: scale(50),
                  height: scale(30),
                  backgroundColor: rgba(COLORS_LIGHT.PRIMARY, 0.1),
                  justifyContent: "center",
                }}
              >
                {"Power"}
              </CText>
              <CText
                fontSize={14}
                textAlign={"center"}
                fontWeight={"bold"}
                style={{
                  width: scale(35),
                  height: scale(30),
                  backgroundColor: rgba(COLORS_LIGHT.RED, 0.1),
                  justifyContent: "center",
                }}
              >
                {"Acc."}
              </CText>
              <CText
                fontSize={14}
                textAlign={"center"}
                fontWeight={"bold"}
                style={{
                  width: scale(35),
                  height: scale(30),
                  backgroundColor: rgba(COLORS_LIGHT.PRIMARY, 0.1),
                  justifyContent: "center",
                }}
              >
                {"PP"}
              </CText>
            </View>
          )}
          ListFooterComponent={() => <View style={{ height: scale(8) }} />}
        />
      </View>
    );
  };

  return (
    <View style={{ flex: 1 }}>
      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{ flexGrow: 1 }}
        showsVerticalScrollIndicator={false}
      >
        {renderMove(MOVE.LEVEL_UP)}
        {renderMove(MOVE.TUTOR)}
        {renderMove(MOVE.MACHINE)}
        {renderMove(MOVE.EGG)}
      </ScrollView>
      <FloatingActionGroups
        //@ts-ignore
        groups={versions.slice(0, 3)}
        onPressAction={(indexVersion, versionName) => {
          if (versionName === MORE_ITEM.name) {
            setTimeout(() => {
              setIsShow(true);
            }, 250);
          } else {
            setCurrentVersion(versionName.toUpperCase());
          }
        }}
      />
      <CModal
        isShow={isShow}
        titleHeader={"Versions"}
        isShowFooter={false}
        onCloseModal={() => setIsShow(false)}
        renderContent={() => {
          return (
            <FlatList
              data={versions}
              showsVerticalScrollIndicator={false}
              ListFooterComponent={() => <View style={{ height: scale(8) }} />}
              renderItem={({ item }) => {
                const colorVersion =
                  PokemonVersionColors[item.name.toUpperCase()];
                const isSelected = currentVersion === item.name.toUpperCase();

                return (
                  <TouchableOpacity
                    activeOpacity={isSelected ? 1 : 0.2}
                    onPress={() => {
                      if (!isSelected) {
                        setCurrentVersion(item.name.toUpperCase());
                        setIsShow(false);
                      }
                    }}
                    style={{
                      ...styles.itemContainer,
                      backgroundColor: isSelected
                        ? rgba(colorVersion, 0.3)
                        : "#fff",
                    }}
                  >
                    <CText
                      bold={isSelected}
                      fontSize={16}
                      color={isSelected ? colorVersion : GET_COLORS().BLACK_1}
                      style={{
                        width: DEVICE_WIDTH - scale(isSelected ? 96 : 72),
                      }}
                    >
                      {`${item.name.toUpperCase()} (${STRING_CONVERTER.formatVersion(
                        item.name
                      )})`}
                    </CText>
                  </TouchableOpacity>
                );
              }}
            />
          );
        }}
      />
    </View>
  );
};

export default TabMoves;

const styles = StyleSheet.create({
  itemContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: scale(12),
    marginVertical: scale(3),
    borderRadius: scale(10),
    marginHorizontal: scale(24),
  },
});
