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
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <CText fontSize={16} fontWeight={"700"} color={COLORS_LIGHT.BLACK_3}>
          {"Ability"}
        </CText>
        <View
          style={{
            flexDirection: "row",
            flexWrap: "wrap",
            gap: scale(4),
            paddingRight: scale(0),
            flex: 1,
            marginHorizontal: scale(24),
          }}
        >
          {info &&
            info?.abilities.map((item, index) => {
              return (
                <Animated.View
                  key={index}
                  layout={Layout.springify().mass(0.8)}
                >
                  <CText
                    fontSize={16}
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
      </View>
    );
  };
  return (
    <ScrollView
      style={{
        flex: 1,
        paddingHorizontal: scale(12),
        paddingVertical: scale(12),
      }}
    >
      <CText fontSize={17} fontWeight={"bold"} distanceBottom={8}>
        {species?.flavor_text_entries[0].flavor_text.replace(/[\n\f]/g, " ")}
      </CText>
      <CText
        fontSize={17}
        fontWeight={"700"}
        color={COLORS_LIGHT.BLACK_2}
        distanceBottom={12}
      >
        {"About"}
      </CText>
      <LabelValueComponent value={`${info?.height} m`} label={"Height"} />
      <LabelValueComponent value={`${info?.weight} kg`} label={"Weight"} />

      {renderAbility()}
      <CText
        fontSize={17}
        fontWeight={"700"}
        color={COLORS_LIGHT.BLACK_2}
        distanceBottom={12}
        distanceTop={12}
      >
        {"Other"}
      </CText>
      <LabelValueComponent
        value={`${species?.egg_groups[0]?.name}`}
        label={"Egg Groups"}
      />
      <LabelValueComponent
        value={`${species?.egg_groups[1]?.name}`}
        label={"Egg Cycle"}
      />
      <LabelValueComponent
        value={`${species?.growth_rate.name}`}
        label={"Growth Rate"}
      />
      <LabelValueComponent
        value={`${species?.capture_rate} %`}
        label={"Capture Rate"}
      />
    </ScrollView>
  );
};

export default TabAbout;
