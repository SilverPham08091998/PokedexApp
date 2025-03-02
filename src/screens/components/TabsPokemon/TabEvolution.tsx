import React from "react";
import { FlatList, ScrollView, View } from "react-native";
import { CImage, CText } from "@/components";
import { EvolutionDetail, EvolutionNode } from "@/type/PokemonEvolutionChain";
import { useAppSelector } from "@/util";
import { scale } from "react-native-utils-scale";
import FeatherIcon from "react-native-vector-icons/Feather";
import { PokemonTypeColors } from "@/type";
import { COLORS_LIGHT, rgba } from "@/theme";
import { STRING_CONVERTER } from "@/util/function";

interface Props {}

enum TRIGGER_EVOLUTION {
  LEVEL_UP = "LEVEL-UP",
  USE_ITEM = "USE-ITEM",
  TRADE = "TRADE",
}

const TabEvolution: React.FC<Props> = () => {
  const { evolution, info } = useAppSelector((state) => {
    return state.home.pokemonInfo;
  });
  const primaryType =
    info?.types.find((type) => type.slot === 1)?.type.name || "";
  const colorPrimary = PokemonTypeColors[primaryType.toUpperCase()];

  const renderEvolutionNode = (
    evolutionNode: EvolutionNode,
    isFirstChain: boolean
  ) => {
    return (
      <View style={{ alignItems: "center" }}>
        {!isFirstChain && (
          <View
            style={{
              alignItems: "center",
              paddingVertical: scale(8),
              flexDirection: "column",
              width: scale(150),
              height: scale(120),
            }}
          >
            <FeatherIcon
              name={"arrow-down"}
              size={24}
              color={COLORS_LIGHT.BLACK_4}
              style={{ paddingVertical: scale(12) }}
            />
            <FlatList
              data={evolutionNode?.evolution_details}
              scrollEnabled={true}
              ItemSeparatorComponent={() => (
                <View style={{ height: scale(8) }} />
              )}
              renderItem={({ item }) => {
                return renderEvolutionDetail(item);
              }}
            />
          </View>
        )}

        <CImage
          url={evolutionNode.pokemon.sprites.front_default}
          resizeMode={"cover"}
          style={{
            width: scale(150),
            height: scale(150),
            backgroundColor: rgba(colorPrimary, 0.3),
            marginHorizontal: scale(12),
            borderRadius: scale(12),
          }}
        />

        <FlatList
          data={evolutionNode.evolves_to}
          scrollEnabled={true}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          ItemSeparatorComponent={() => <View style={{ width: scale(24) }} />}
          renderItem={({ item }) => {
            return renderEvolutionNode(item, false);
          }}
        />
      </View>
    );
  };
  const renderEvolutionDetail = (evolutionDetail?: EvolutionDetail | null) => {
    let conditionEvolution = "";
    conditionEvolution = evolutionDetail?.min_happiness
      ? conditionEvolution + `Happiness is ${evolutionDetail.min_happiness}.\n`
      : conditionEvolution;
    conditionEvolution = evolutionDetail?.min_beauty
      ? conditionEvolution + `Beauty is ${evolutionDetail.min_beauty}.\n`
      : conditionEvolution;
    conditionEvolution = evolutionDetail?.time_of_day
      ? conditionEvolution + `Time of day is ${evolutionDetail.time_of_day}.\n`
      : conditionEvolution;
    conditionEvolution = evolutionDetail?.location
      ? conditionEvolution + `Location is ${evolutionDetail.location.name}.\n`
      : conditionEvolution;
    conditionEvolution = evolutionDetail?.known_move_type
      ? conditionEvolution +
        `It know move type which is ${STRING_CONVERTER.upperCaseFirstChart(
          evolutionDetail.known_move_type.name
        )}.\n`
      : conditionEvolution;
    conditionEvolution = evolutionDetail?.min_affection
      ? conditionEvolution + `Affection ${evolutionDetail.min_affection}.\n`
      : conditionEvolution;
    conditionEvolution = evolutionDetail?.min_level
      ? conditionEvolution + `Up to Lv${evolutionDetail.min_level}.\n`
      : conditionEvolution;
    conditionEvolution = evolutionDetail?.item
      ? conditionEvolution +
        `Use item ${STRING_CONVERTER.upperCaseFirstChart(
          evolutionDetail.item.name
        )}`
      : conditionEvolution;
    conditionEvolution = evolutionDetail?.held_item
      ? conditionEvolution +
        `Held item ${STRING_CONVERTER.upperCaseFirstChart(
          evolutionDetail.held_item.name
        )}`
      : conditionEvolution;
    conditionEvolution = evolutionDetail?.known_move
      ? conditionEvolution +
        `It know move ${STRING_CONVERTER.upperCaseFirstChart(
          evolutionDetail.known_move.name
        )}.\n`
      : conditionEvolution;
    conditionEvolution = evolutionDetail?.relative_physical_stats
      ? conditionEvolution +
        `The required relation between the Pokémon's Attack and Defense stats ${evolutionDetail.relative_physical_stats}.\n`
      : conditionEvolution;
    if (
      evolutionDetail?.trigger.name.toUpperCase() === TRIGGER_EVOLUTION.USE_ITEM
    ) {
      return (
        <CText color={COLORS_LIGHT.BLACK_4} fontSize={14}>
          {`Use item with ${conditionEvolution}`}
        </CText>
      );
    }
    if (
      evolutionDetail?.trigger.name.toUpperCase() === TRIGGER_EVOLUTION.LEVEL_UP
    ) {
      return (
        <CText color={COLORS_LIGHT.BLACK_4} fontSize={14}>
          {`Level up with ${conditionEvolution}`}
        </CText>
      );
    }
    if (
      evolutionDetail?.trigger.name.toUpperCase() === TRIGGER_EVOLUTION.TRADE
    ) {
      return (
        <CText color={COLORS_LIGHT.BLACK_4} fontSize={14}>
          {`Trade with ${conditionEvolution}`}
        </CText>
      );
    }
    return (
      <CText color={COLORS_LIGHT.BLACK_4} fontSize={14}>
        {`Evolution need unknown`}
      </CText>
    );
  };
  return (
    <ScrollView
      style={{
        flex: 1,
      }}
      contentContainerStyle={{
        flexGrow: 1,
        paddingBottom: scale(24),
      }}
      showsVerticalScrollIndicator={false}
    >
      <View style={{ flex: 1 }}>
        {evolution?.chain && renderEvolutionNode(evolution?.chain, true)}
      </View>
    </ScrollView>
  );
};

export default TabEvolution;
