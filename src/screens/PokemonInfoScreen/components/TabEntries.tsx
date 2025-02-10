import React from "react";
import { useAppSelector } from "@/util";
import { FlatList } from "react-native";
import { LabelValueComponent } from "@/components";
import { STRING_CONVERTER } from "@/util/function";

interface Props {}

const TabEntries: React.FC<Props> = () => {
  const { species } = useAppSelector((state) => {
    return state.home.pokemonInfo;
  });
  return (
    <FlatList
      data={species?.flavor_text_entries.filter(
        (i) => i.language.name === "en"
      )}
      showsVerticalScrollIndicator={false}
      renderItem={({ item }) => {
        return (
          <LabelValueComponent
            value={item.flavor_text.replace(/[\n\f]/g, " ")}
            label={STRING_CONVERTER.upperCaseFirstChart(item.version.name)}
            isLine={true}
          />
        );
      }}
    />
  );
};

export default TabEntries;
