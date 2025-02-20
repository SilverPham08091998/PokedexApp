import { FlatList, ScrollView, View } from "react-native";
import { CPokemonItem } from "@/components";
import React from "react";
import { scale } from "react-native-utils-scale";
import { useAppSelector } from "@/util";

const TabPokemon = () => {
  const { pokemons } = useAppSelector((state) => {
    return state.home.typeInfo;
  });

  return (
    <ScrollView>
      <FlatList
        showsVerticalScrollIndicator={false}
        scrollEnabled={false}
        style={{ flex: 1 }}
        data={pokemons}
        columnWrapperStyle={{ justifyContent: "space-around" }}
        numColumns={2}
        renderItem={({ item }) => {
          return <CPokemonItem item={item} />;
        }}
        ItemSeparatorComponent={() => <View style={{ height: scale(12) }} />}
      />
    </ScrollView>
  );
};
export default TabPokemon;
