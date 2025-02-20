import { ScrollView } from "react-native";
import { CPokemonMove } from "@/components";
import React from "react";
import { useAppSelector } from "@/util";

const TabMove: React.FC<any> = () => {
  const { typeInfo } = useAppSelector((state) => {
    return state.home;
  });

  return (
    <ScrollView
      style={{
        flex: 1,
      }}
      contentContainerStyle={{
        flexGrow: 1,
      }}
      showsVerticalScrollIndicator={false}
    >
      <CPokemonMove
        moves={typeInfo.moves || []}
        moveLearntBy={"MACHINE"}
        currentVersion={""}
        title={""}
      />
    </ScrollView>
  );
};
export default TabMove;
