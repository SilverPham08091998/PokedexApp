import { ScrollView, StyleSheet, View } from "react-native";
import { CPokemonEffective, CText } from "@/components";
import React from "react";
import { DEVICE_WIDTH, useAppSelector } from "@/util";
import { scale } from "react-native-utils-scale";
import { PokemonTypeColors } from "@/type";
import { rgba } from "@/theme";

const TabInfo: React.FC<any> = () => {
  const { info } = useAppSelector((state) => {
    return state.home.typeInfo;
  });

  const renderAboutItem = (title: string, quantity?: number) => {
    const colorPrimary = PokemonTypeColors[info?.name.toUpperCase() || ""];
    return (
      <View
        style={{
          ...styles.aboutItemContainer,
          backgroundColor: rgba(colorPrimary, 0.3),
        }}
      >
        <CText fontSize={18} fontWeight={"bold"} distanceBottom={8}>
          {quantity}
        </CText>
        <CText fontSize={14} fontWeight={"400"} textAlign={"center"}>
          {title}
        </CText>
      </View>
    );
  };
  const renderAbout = () => {
    return (
      <View style={styles.aboutContainer}>
        {renderAboutItem(`${info?.name} type Pokémon`, info?.pokemon.length)}
        {renderAboutItem(
          "Single type Pokémon",
          info?.pokemon.filter((i) => i.slot === 1).length
        )}
        {renderAboutItem(
          "Dual type Pokémon",
          info?.pokemon.filter((i) => i.slot === 2).length
        )}
        {renderAboutItem(`${info?.name}-type moves`, info?.moves.length)}
      </View>
    );
  };
  return (
    <ScrollView style={styles.container}>
      {renderAbout()}
      <CPokemonEffective type={info} effectiveType={"SUPER"} disabled={true} />
      <CPokemonEffective type={info} effectiveType={"WEAK"} disabled={true} />
      <CPokemonEffective type={info} effectiveType={"NONE"} disabled={true} />
    </ScrollView>
  );
};
export default TabInfo;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  aboutContainer: {
    flexDirection: "row",
    gap: 10,
    flexWrap: "wrap",
    justifyContent: "space-around",
    paddingBottom: scale(12),
  },
  aboutItemContainer: {
    alignItems: "center",
    width: DEVICE_WIDTH / 3,
    height: scale(80),
    borderRadius: scale(12),
    justifyContent: "center",
    padding: scale(12),
  },
});
