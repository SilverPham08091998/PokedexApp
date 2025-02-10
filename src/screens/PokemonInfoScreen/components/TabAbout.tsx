import React from "react";
import { ScrollView, View } from "react-native";
import { CText, LabelValueComponent } from "@/components";
import { useAppSelector } from "@/util";
import { COLORS_LIGHT } from "@/theme";
import { STRING_CONVERTER } from "@/util/function";
import Animated, { Layout } from "react-native-reanimated";
import { scale } from "react-native-utils-scale";

interface Props {}

const TabAbout: React.FC<Props> = () => {
  const { species, info } = useAppSelector((state) => {
    return state.home.pokemonInfo;
  });
  const renderAbility = () => {
    return (
      <View
        style={{
          flexDirection: "row",
          flexWrap: "wrap",
          gap: scale(4),
          paddingRight: scale(0),
        }}
      >
        {info &&
          info?.abilities.map((item, index) => {
            return (
              <Animated.View key={index} layout={Layout.springify().mass(0.8)}>
                <CText
                  fontSize={14}
                  fontWeight={"500"}
                  color={COLORS_LIGHT.FRONT_WAVE_COLOR}
                  textDecorationLine={"underline"}
                >
                  {`${STRING_CONVERTER.upperCaseFirstChart(
                    item.ability.name
                  )} ${item.is_hidden ? "(Hidden Ability)" : ""}`}
                </CText>
              </Animated.View>
            );
          })}
      </View>
    );
  };
  const renderLocalNo = () => {
    return (
      <View
        style={{
          flexDirection: "column",
          flexWrap: "wrap",
          gap: scale(4),
          paddingRight: scale(0),
        }}
      >
        {species &&
          species?.pokedex_numbers.map((item, index) => {
            return (
              <Animated.View key={index} layout={Layout.springify().mass(0.8)}>
                <CText
                  fontSize={14}
                  fontWeight={"500"}
                  color={COLORS_LIGHT.BLACK_4}
                >
                  {`${STRING_CONVERTER.formatId(
                    item?.entry_number
                  )} (${STRING_CONVERTER.upperCaseFirstChart(
                    item.pokedex.name
                  )})`}
                </CText>
              </Animated.View>
            );
          })}
      </View>
    );
  };
  return (
    <ScrollView
      style={{
        flex: 1,
        paddingHorizontal: scale(12),
      }}
      showsVerticalScrollIndicator={false}
    >
      {/*<CText fontSize={17} fontWeight={"bold"} distanceBottom={8}>*/}
      {/*  {species?.flavor_text_entries[0].flavor_text.replace(/[\n\f]/g, " ")}*/}
      {/*</CText>*/}
      <CText
        fontSize={18}
        fontWeight={"700"}
        color={COLORS_LIGHT.BLACK_2}
        distanceBottom={12}
        textDecorationLine={"underline"}
      >
        {"Pokédex data"}
      </CText>
      <LabelValueComponent
        value={`${STRING_CONVERTER.formatId(info?.id)}`}
        label={"National No"}
        isLine={true}
      />
      <LabelValueComponent
        value={`${info?.height} m`}
        label={"Height"}
        isLine={true}
      />
      <LabelValueComponent
        value={`${info?.weight} kg`}
        label={"Weight"}
        isLine={true}
      />

      <LabelValueComponent
        label={"Ability"}
        valueComponent={renderAbility}
        isLine={true}
      />
      <LabelValueComponent
        label={"Local No"}
        valueComponent={renderLocalNo}
        isLine={true}
      />
      <CText
        fontSize={18}
        fontWeight={"700"}
        color={COLORS_LIGHT.BLACK_2}
        textDecorationLine={"underline"}
        distanceBottom={12}
      >
        {"Training"}
      </CText>
      <LabelValueComponent
        value={`${info?.stats
          .filter((i) => i.effort)
          .map(
            (value) =>
              `${value.effort} ${STRING_CONVERTER.upperCaseFirstChart(
                value.stat.name
              )}`
          )
          .join(", ")}`}
        label={"EV yield"}
        isLine={true}
      />
      <LabelValueComponent
        value={`${species?.capture_rate}% (5.9% with PokéBall, full HP)`}
        label={"Capture Rate"}
        isLine={true}
      />
      <LabelValueComponent
        value={`${STRING_CONVERTER.upperCaseFirstChart(
          species?.growth_rate.name
        )}`}
        label={"Growth Rate"}
        isLine={true}
      />
      <LabelValueComponent
        value={`${species?.base_happiness} (Normal)`}
        label={"Base Friendship"}
        isLine={true}
      />
      <CText
        fontSize={18}
        fontWeight={"700"}
        color={COLORS_LIGHT.BLACK_2}
        textDecorationLine={"underline"}
        distanceBottom={12}
      >
        {"Breeding"}
      </CText>
      <LabelValueComponent
        value={`${species?.egg_groups
          .map((i) => STRING_CONVERTER.upperCaseFirstChart(i.name))
          .join(", ")}`}
        label={"Egg Groups"}
        isLine={true}
      />
      <LabelValueComponent
        value={`${species?.hatch_counter} (4,884–5,140 steps)`}
        label={"Egg Cycles"}
        isLine={true}
      />
      <LabelValueComponent
        value={"87.5% male, 12.5% female"}
        label={"Gender"}
        isLine={true}
      />
    </ScrollView>
  );
};

export default TabAbout;
