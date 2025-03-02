import React from "react";
import { FlatList, ScrollView, View } from "react-native";
import { CText } from "@/components";
import { PokemonTypeColors } from "@/type";
import { useAppSelector } from "@/util";
import { scale } from "react-native-utils-scale";
import * as Progress from "react-native-progress";
import { rgba } from "@/theme";
import { STRING_CONVERTER } from "@/util/function";
import ChartRadar from "@/screens/components/TabsPokemon/ChartRadar";

interface Props {}

const TabStats: React.FC<Props> = () => {
  const { info } = useAppSelector((state) => {
    return state.home.pokemonInfo;
  });
  const primaryType =
    info?.types.find((type) => type.slot === 1)?.type.name || "";
  const colorPrimary = PokemonTypeColors[primaryType.toUpperCase()];
  return (
    <ScrollView
      style={{
        flex: 1,
        paddingVertical: scale(12),
      }}
    >
      <CText fontSize={18} fontWeight={"700"} color={colorPrimary}>
        Base Stats
      </CText>
      <FlatList
        scrollEnabled={false}
        data={info?.stats}
        renderItem={({ item }) => {
          return (
            <View
              style={{
                flexDirection: "row",
                flex: 1,
                justifyContent: "space-around",
                height: scale(30),
                alignItems: "center",
              }}
            >
              <CText
                fontSize={16}
                color={colorPrimary}
                style={{ alignItems: "flex-start", width: scale(120) }}
              >
                {STRING_CONVERTER.upperCaseFirstChart(item.stat.name)}
              </CText>
              <View
                style={{
                  backgroundColor: colorPrimary,
                  width: scale(1),
                  height: scale(30),
                }}
              />
              <CText
                color={colorPrimary}
                style={{ width: scale(50), marginLeft: scale(12) }}
              >
                {item.base_stat}
              </CText>
              <View
                style={{
                  justifyContent: "flex-end",
                  alignItems: "flex-end",
                  paddingHorizontal: scale(4),
                }}
              >
                <Progress.Bar
                  progress={item.base_stat / 200}
                  color={colorPrimary}
                  unfilledColor={rgba(colorPrimary, 0.3)}
                  borderWidth={0}
                  animated={true}
                  animationType={"timing"}
                  useNativeDriver={true}
                  borderRadius={2}
                />
              </View>
            </View>
          );
        }}
        ListHeaderComponent={() => <View style={{ height: scale(12) }} />}
      />
      <View style={{ alignSelf: "center" }}>
        <ChartRadar />
      </View>
    </ScrollView>
  );
};
export default TabStats;
