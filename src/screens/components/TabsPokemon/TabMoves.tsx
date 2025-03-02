import React, { useEffect, useState } from "react";
import {
  FlatList,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import { CModal, CPokemonMove, CText } from "@/components";
import { DEVICE_WIDTH, useAppSelector } from "@/util";
import FloatingActionGroups from "@/screens/components/TabsPokemon/FloatingActionButton";
import { GET_COLORS, rgba } from "@/theme";
import { scale } from "react-native-utils-scale";
import { STRING_CONVERTER } from "@/util/function";
import { PokemonVersionColors } from "@/type";
import { MORE_ITEM } from "@/screens/components/TabsPokemon/index";

interface Props {}

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
      setCurrentVersion(versions[24].name);
    }
  }, []);

  return (
    <View style={{ flex: 1 }}>
      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{ flexGrow: 1 }}
        showsVerticalScrollIndicator={false}
      >
        <CPokemonMove
          moves={moves || []}
          currentVersion={currentVersion}
          moveLearntBy={"LEVEL-UP"}
          title={"Moves learnt by level up"}
        />
        <CPokemonMove
          moves={moves || []}
          currentVersion={currentVersion}
          moveLearntBy={"TUTOR"}
          title={"Moves learnt by tutor"}
        />
        <CPokemonMove
          moves={moves || []}
          currentVersion={currentVersion}
          moveLearntBy={"MACHINE"}
          title={"Moves learnt by TM"}
        />
        <CPokemonMove
          moves={moves || []}
          currentVersion={currentVersion}
          moveLearntBy={"EGG"}
          title={"Moves learnt by egg"}
        />
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
                        setTimeout(() => {
                          setIsShow(false);
                        }, 100);
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
                        flex: 1,
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
